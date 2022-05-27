import { JSX } from "solid-js";
import style from "./style.module.less";
import {
  AnswerContext,
  AnswerState,
  BlankResult,
  ChoiceResult,
  ShortResult,
} from "./types";
import { match, P } from "ts-pattern";
import { assertIs, openWin, tuple } from "./utils";
import { render } from "solid-js/web";
import { CLIENT } from "./client";
import * as It from "./itertools";

export interface AnswerAndContext<A> {
  context?: AnswerContext;
  answer?: A;
}

function stateToPriv(state: AnswerState): number {
  switch (state) {
    case AnswerState.Sure:
      return 0;
    case AnswerState.WorkingOn:
      return 1;
    case AnswerState.NotSure:
      return 2;
  }
}

function cmpNameWithState(
  [aName, aState]: [string, AnswerState | undefined],
  [bName, bState]: [string, AnswerState | undefined]
): number {
  return match(tuple(aState, bState))
    .with(tuple(undefined, undefined), () => aName.localeCompare(bName))
    .with(tuple(undefined, P.not(undefined)), () => 1)
    .with(tuple(P.not(undefined), undefined), () => -1)
    .with(
      tuple(P.not(undefined), P.not(undefined)),
      ([aState, bState]) => stateToPriv(bState) - stateToPriv(aState)
    )
    .exhaustive();
}

function cmpNameWithAnswerAndCtx<A>(
  [aName, aCtx]: [string, AnswerAndContext<A>],
  [bName, bCtx]: [string, AnswerAndContext<A>]
): number {
  return cmpNameWithState(
    tuple(aName, aCtx.context?.state),
    tuple(bName, bCtx.context?.state)
  );
}

function cmpNameWithCtx(
  [aName, aCtx]: [string, AnswerContext | undefined],
  [bName, bCtx]: [string, AnswerContext | undefined]
): number {
  return cmpNameWithState(tuple(aName, aCtx?.state), tuple(bName, bCtx?.state));
}

function stateToClass(state: AnswerState | undefined): string | undefined {
  if (state === undefined) {
    return;
  }
  switch (state) {
    case AnswerState.WorkingOn:
      return style.stateWorkingOn;
    case AnswerState.NotSure:
      return style.stateNotSure;
    case AnswerState.Sure:
      return style.stateSure;
  }
}

function percent(a: number, b: number) {
  return `${Math.floor((a * 100) / b)}%`;
}

function sortByKey<V>([a]: [string, V], [b]: [string, V]) {
  return a.localeCompare(b);
}

export abstract class Details<A> {
  private _details: Map<string, AnswerAndContext<A>> = new Map();
  private _id: number;
  private _renderUI: () => JSX.Element = () => undefined;

  protected abstract renderUI(): () => JSX.Element;

  protected get details(): Map<string, AnswerAndContext<A>> {
    return this._details;
  }

  constructor(id: number, subjectItem: Element) {
    this._id = id;

    // Click problem title to show detail of answers.
    let itemType = subjectItem.querySelector(".item-type");
    assertIs(HTMLElement, itemType);
    itemType.classList.add(style.clickable);
    itemType.addEventListener("click", () => {
      let rect = itemType?.getBoundingClientRect();
      this.showDetail({ top: rect?.top, left: rect?.left });
    });
  }

  showDetail(opts: { top?: number; left?: number }) {
    const win = openWin({
      title: "详细答案",
      height: 200,
      width: 300,
      ...opts,
    });
    render(
      () => (
        <div class={style.mainBody}>
          <fieldset class={style.answerMark}>
            <legend>标记</legend>
            <input
              type="text"
              placeholder="留言"
              onchange={(ev) =>
                CLIENT.updateMsg(this._id, ev.currentTarget.value)
              }
            />
            <button
              type="button"
              class={style.stateWorkingOn}
              onClick={() =>
                CLIENT.updateState(this._id, AnswerState.WorkingOn)
              }
            >
              我正在做
            </button>
            <button
              type="button"
              class={style.stateSure}
              onClick={() => CLIENT.updateState(this._id, AnswerState.Sure)}
            >
              我很确定
            </button>
            <button
              type="button"
              class={style.stateNotSure}
              onClick={() => CLIENT.updateState(this._id, AnswerState.NotSure)}
            >
              我不确定
            </button>
          </fieldset>
          <div>
            <fieldset classList={{ [style.answerMsg]: true }}>
              <legend> 留言 </legend>
              <ul>
                {
                  It.then(this.details)
                    .then(It.sort(cmpNameWithAnswerAndCtx))
                    .then(
                      It.filterMap(([user, { context }]) => {
                        if (context === undefined) {
                          return;
                        }
                        let msg = context.msg;
                        if (context.state === AnswerState.WorkingOn) {
                          msg = msg ?? "我正在做";
                        }
                        if (msg === undefined) {
                          return;
                        }
                        return (
                          <li class={stateToClass(context.state)}>
                            <span
                              class={style.answerMsgName}
                            >{`${user}: `}</span>
                            {msg}
                          </li>
                        );
                      })
                    )
                    .then(It.collectArray).t
                }
              </ul>
            </fieldset>
            <div classList={{ [style.answerDetail]: true }}>
              {this._renderUI()}
            </div>
          </div>
        </div>
      ),
      win.document.body
    );
  }

  updateUI() {
    this._renderUI = this.renderUI();
  }

  updateAnswer(username: string, data: AnswerAndContext<A>) {
    this._details.set(username, data);
  }
}

class Tooltip {
  private readonly _ele: Element;

  constructor(ele: Element) {
    this._ele = ele;
  }

  setContent(txt: string) {
    this._ele.setAttribute("title", txt);
  }
}

export class Choice extends Details<ChoiceResult> {
  private readonly _choiceMap: (c: string) => string;
  private readonly _tooltips: Map<string, Tooltip>;

  constructor(
    id: number,
    subjectItem: Element,
    choiceMap: (c: string) => string
  ) {
    super(id, subjectItem);
    this._choiceMap = choiceMap;
    this._tooltips = It.then(
      subjectItem.querySelectorAll(
        ".item-body .checkboxInput, .item-body .radioInput"
      )
    )
      .then((t) => Array.from(t))
      .then(It.enumerate)
      .then(
        It.fold(new Map<string, Tooltip>(), (tooltips, [idx, ele]) =>
          tooltips.set(String.fromCharCode(idx + 65), new Tooltip(ele))
        )
      ).t;
  }

  protected renderUI(): () => JSX.Element {
    // choice => [user, context?][]
    const choiceToUsers = It.then(this.details)
      .then(
        It.fold(
          new Map<string, [string, AnswerContext | undefined][]>(),
          (choiceToUsers, [user, { answer, context }]) => {
            if (answer !== undefined) {
              for (let choice of answer) {
                choice = this._choiceMap(choice);
                const users = choiceToUsers.get(choice) ?? [];
                users.push([user, context]);
                return choiceToUsers.set(choice, users);
              }
            }
            return choiceToUsers;
          }
        )
      )
      .then(It.collectArray)
      // Sort by choice.
      .t.sort(sortByKey);

    // Update tooltips to show how many users have selected the choice.
    It.then(choiceToUsers).then(
      It.forEach(([choice, users]) => {
        this._tooltips
          .get(choice)
          ?.setContent(percent(users.length, this.details.size));
      })
    );

    return () =>
      It.then(choiceToUsers)
        .then(
          It.map(([choice, users]) => (
            <div>
              <p>
                <strong>{choice}</strong>
              </p>
              <ul>
                {
                  It.then(users)
                    .then(It.sort(cmpNameWithCtx))
                    .then(
                      It.map(([user, ctx]) => (
                        <li class={stateToClass(ctx?.state)}>{user}</li>
                      ))
                    )
                    .then(It.collectArray).t
                }
              </ul>
            </div>
          ))
        )
        .then(It.collectArray).t;
  }
}

export class Blank extends Details<BlankResult> {
  private readonly _tooltips: Map<string, Tooltip>;

  constructor(id: number, subjectItem: Element) {
    super(id, subjectItem);
    this._tooltips = It.then(
      subjectItem.querySelectorAll(".item-body .blank-item-dynamic")
    )
      .then<Element[]>(Array.from)
      .then(It.enumerate)
      .then(
        It.fold(new Map(), (tooltips, [idx, ele]) =>
          tooltips.set(String.fromCharCode(idx + 49), new Tooltip(ele))
        )
      ).t;
  }

  protected renderUI(): () => JSX.Element {
    // blank => [fill, [user, context?]][]
    const blankToFillAndUsers = It.then(this.details)
      .then(
        It.fold(
          new Map<string, Map<string, [string, AnswerContext | undefined][]>>(),
          (blankToFillToUsers, [user, { answer, context }]) => {
            if (answer === undefined) {
              return blankToFillToUsers;
            }
            return It.then(answer)
              .then(Object.entries)
              .then(
                It.fold(
                  blankToFillToUsers,
                  (blankToFillToUsers, [blank, fill]) => {
                    // Trim spaces.
                    fill = fill.trim();
                    const fillToUsers =
                      blankToFillToUsers.get(blank) ?? new Map();
                    const users = fillToUsers.get(fill) ?? [];
                    users.push([user, context]);
                    return blankToFillToUsers.set(
                      blank,
                      fillToUsers.set(fill, users)
                    );
                  }
                )
              ).t;
          }
        )
      )
      .then(
        It.map(([blank, fillToUsers]) =>
          tuple(
            blank,
            // Sory by filled text.
            It.then(fillToUsers).then(It.sort(sortByKey)).t
          )
        )
      )
      .then(It.collectArray)
      // Sort by blank ID.
      .t.sort(sortByKey);

    It.then(blankToFillAndUsers).then(
      It.forEach(([blank, fillAndUsers]) => {
        const most = It.then(fillAndUsers)
          .then(It.map(([fill, users]) => tuple(fill, users.length)))
          .then(It.sort(([_1, a], [_2, b]) => b - a))
          .then(It.first).t;
        // Update tooltips to show the most popular answers.
        this._tooltips
          .get(blank)
          ?.setContent(
            most === undefined
              ? ""
              : `(${percent(most[1], this.details.size)}) ${most[0]}`
          );
      })
    );

    return () =>
      It.then(blankToFillAndUsers)
        .then(
          It.map(([blank, fillAndUsers]) => (
            // **#blank**
            //   - fill
            //     - user
            <div>
              <p>
                <strong>{`#${blank}`}</strong>
              </p>
              <ul>
                {
                  It.then(fillAndUsers)
                    .then(
                      It.map(([fill, users]) => (
                        <li>
                          <pre>{fill}</pre>
                          <ul>
                            {
                              It.then(users)
                                .then(It.sort(cmpNameWithCtx))
                                .then(
                                  It.map(([user, ctx]) => (
                                    <li class={stateToClass(ctx?.state)}>
                                      {user}
                                    </li>
                                  ))
                                )
                                .then(It.collectArray).t
                            }
                          </ul>
                        </li>
                      ))
                    )
                    .then(It.collectArray).t
                }
              </ul>
            </div>
          ))
        )
        .then(It.collectArray).t;
  }
}

export class ShortAnswer extends Details<ShortResult> {
  protected renderUI(): () => JSX.Element {
    return () =>
      It.then(this.details)
        .then(It.sort(cmpNameWithAnswerAndCtx))
        .then(
          It.map(([user, { answer, context }]) => {
            const content = answer?.content;
            const filelist = answer?.attachments?.filelist;
            let contentHtml;
            let filelistHtml;
            if (content !== undefined) {
              contentHtml = (
                <div
                  class={style.answerDetailShortAnswer}
                  innerHTML={content}
                />
              );
            }
            if (filelist !== undefined) {
              filelistHtml = (
                <ul>
                  {
                    It.then(filelist)
                      .then(
                        It.map(({ fileUrl, fileName }) => (
                          <li>
                            <a href={fileUrl}>{fileName}</a>
                          </li>
                        ))
                      )
                      .then(It.collectArray).t
                  }
                </ul>
              );
            }
            if (contentHtml === undefined && filelistHtml === undefined) {
              return;
            }
            // **user**
            // <content>
            //   - filelist
            return (
              <>
                <p class={stateToClass(context?.state)}>
                  <strong>{user}</strong>
                </p>
                {contentHtml}
                {filelistHtml}
              </>
            );
          })
        )
        .then(It.collectArray).t;
  }
}
