import {
  Accessor,
  createEffect,
  createMemo,
  createRoot,
  createSignal,
  For,
  JSX,
} from "solid-js";
import style from "./style.module.less";
import {
  AnswerContext,
  AnswerState,
  BlankResult,
  ChoiceResult,
  ShortResult,
} from "./types";
import { assertIs, openWin, tuple } from "./utils";
import { render } from "solid-js/web";
import { CLIENT } from "./client";
import * as It from "./itertools";

export interface AnswerAndContext<A> {
  context?: AnswerContext;
  answer?: A;
}

function strCmp(a: string, b: string): number {
  if (a === b) {
    return 0;
  } else if (a < b) {
    return -1;
  } else {
    return 1;
  }
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
  if (aState === undefined) {
    if (bState === undefined) {
      return strCmp(aName, bName);
    }
    return 1;
  } else if (bState === undefined) {
    return -1;
  } else {
    const ord = stateToPriv(bState) - stateToPriv(aState);
    return ord === 0 ? strCmp(aName, bName) : ord;
  }
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

function cmpByKey<V>([a]: [string, V], [b]: [string, V]) {
  return strCmp(a, b);
}

type DetailsData<A> = Map<string, AnswerAndContext<A>>;

export class Details<A> {
  private readonly _details: DetailsData<A> = new Map();
  readonly updateUI: () => void;

  protected constructor(
    id: number,
    subjectItem: Element,
    makeRender: (details: Accessor<DetailsData<A>>) => () => JSX.Element
  ) {
    this.updateUI = createRoot(() => {
      const [details, setDetails] = createSignal<DetailsData<A>>(new Map(), {
        equals: false,
      });
      const updateUI = () => setDetails(this._details);
      const DetailsRender = makeRender(details);

      // Click problem title to show detail of answers.
      let itemType = subjectItem.querySelector(".item-type");
      assertIs(HTMLElement, itemType);
      itemType.classList.add(style.clickable);
      itemType.addEventListener("click", () => {
        let rect = itemType?.getBoundingClientRect();
        const win = openWin({
          title: "详细答案",
          height: 300,
          width: 350,
          top: rect?.top,
          left: rect?.left,
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
                    CLIENT.updateMsg(id, ev.currentTarget.value)
                  }
                />
                <button
                  type="button"
                  class={style.stateWorkingOn}
                  onClick={() => CLIENT.updateState(id, AnswerState.WorkingOn)}
                >
                  我正在做
                </button>
                <button
                  type="button"
                  class={style.stateSure}
                  onClick={() => CLIENT.updateState(id, AnswerState.Sure)}
                >
                  我很确定
                </button>
                <button
                  type="button"
                  class={style.stateNotSure}
                  onClick={() => CLIENT.updateState(id, AnswerState.NotSure)}
                >
                  我不确定
                </button>
              </fieldset>
              <div>
                <fieldset classList={{ [style.answerMsg]: true }}>
                  <legend> 留言 </legend>
                  <ul>
                    <For
                      each={It.pipe(details())
                        .then(It.sort(cmpNameWithAnswerAndCtx))
                        .then(It.collectArray)
                        .exec()}
                    >
                      {([user, { context }]) => {
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
                      }}
                    </For>
                  </ul>
                </fieldset>
                <div classList={{ [style.answerDetail]: true }}>
                  <DetailsRender />
                </div>
              </div>
            </div>
          ),
          win.document.body
        );
      });

      return updateUI;
    });
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

type Users = Array<[string, AnswerContext | undefined]>;

export class Choice extends Details<ChoiceResult> {
  constructor(
    id: number,
    subjectItem: Element,
    choiceMap: (s: string) => string
  ) {
    const tooltips = It.pipe(
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
      )
      .exec();

    super(id, subjectItem, (details) => {
      // (choice, (user, context?)[])[]
      const choiceToUsers = createMemo(() =>
        It.pipe(details())
          .then(
            It.fold(
              new Map<string, Users>(),
              (choiceToUsers, [user, { answer, context }]) => {
                if (answer !== undefined) {
                  for (let choice of answer) {
                    choice = choiceMap(choice);
                    const users = choiceToUsers.get(choice) ?? [];
                    users.push([user, context]);
                    choiceToUsers.set(choice, users);
                  }
                }
                return choiceToUsers;
              }
            )
          )
          // Sort by choice.
          .then(It.sort(cmpByKey))
          .then(It.collectArray)
          .exec()
      );

      // Update tooltips to show how many users select the choices.
      createEffect(() => {
        It.pipe(choiceToUsers()).then(
          It.forEach(([choice, users]) => {
            tooltips
              .get(choice)
              ?.setContent(percent(users.length, details().size));
          })
        );
      });

      return () => (
        // choice
        // - user
        <For each={choiceToUsers()}>
          {([choice, users]) => (
            <div>
              <p>
                <strong>{choice}</strong>
              </p>
              <ul>
                <For each={users.sort(cmpNameWithCtx)}>
                  {([user, ctx]) => (
                    <li class={stateToClass(ctx?.state)}>{user}</li>
                  )}
                </For>
              </ul>
            </div>
          )}
        </For>
      );
    });
  }
}

export class Blank extends Details<BlankResult> {
  constructor(id: number, subjectItem: Element) {
    const tooltips = It.pipe(
      subjectItem.querySelectorAll(".item-body .blank-item-dynamic")
    )
      .then<Element[]>(Array.from)
      .then(It.enumerate)
      .then(
        It.fold(new Map(), (tooltips, [idx, ele]) =>
          tooltips.set(String.fromCharCode(idx + 49), new Tooltip(ele))
        )
      )
      .exec();

    super(id, subjectItem, (details) => {
      // (blank, (fill, Users)[])[]
      const blankToFillToUsers = () =>
        It.pipe(details())
          .then(
            It.fold(
              new Map<
                string,
                Map<string, [string, AnswerContext | undefined][]>
              >(),
              (blankToFillToUsers, [user, { answer, context }]) => {
                if (answer === undefined) {
                  return blankToFillToUsers;
                }
                return It.pipe(answer)
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
                  )
                  .exec();
              }
            )
          )
          .then(
            It.map(([blank, fillToUsers]) =>
              tuple(
                blank,
                // Sory by filled text.
                It.pipe(fillToUsers)
                  .then(It.sort(cmpByKey))
                  .then(It.collectArray)
                  .exec()
              )
            )
          )
          // Sort by blank ID.
          .then(It.sort(cmpByKey))
          .then(It.collectArray)
          .exec();

      // Update tooltips to show the most popular answers.
      createEffect(() => {
        It.pipe(blankToFillToUsers()).then(
          It.forEach(([blank, fillToUsers]) => {
            const most = It.pipe(fillToUsers)
              .then(It.map(([fill, users]) => tuple(fill, users.length)))
              .then(It.sort(([_1, a], [_2, b]) => b - a))
              .then(It.first)
              .exec();
            tooltips
              .get(blank)
              ?.setContent(
                most === undefined
                  ? ""
                  : `(${percent(most[1], details().size)}) ${most[0]}`
              );
          })
        );
      });

      return () => (
        // #blank
        // - fill
        //   - user
        <For each={blankToFillToUsers()}>
          {([blank, fillToUsers]) => (
            <div>
              <p>
                <strong>{`#${blank}`}</strong>
              </p>
              <ul>
                <For each={fillToUsers}>
                  {([fill, users]) => {
                    if (fill === "") {
                      return;
                    }
                    return (
                      <li>
                        <p class={style.answerDetailFill}>{fill}</p>
                        <ul>
                          <For each={users.sort(cmpNameWithCtx)}>
                            {([user, ctx]) => (
                              <li class={stateToClass(ctx?.state)}>{user}</li>
                            )}
                          </For>
                        </ul>
                      </li>
                    );
                  }}
                </For>
              </ul>
            </div>
          )}
        </For>
      );
    });
  }
}

export class ShortAnswer extends Details<ShortResult> {
  constructor(id: number, subjectItem: Element) {
    super(id, subjectItem, (details) => {
      const userToAnswers = createMemo(() =>
        It.pipe(details())
          .then(It.sort(cmpNameWithAnswerAndCtx))
          .then(It.collectArray)
          .exec()
      );
      return () => (
        // user
        // <content>
        // - filelist
        <For each={userToAnswers()}>
          {([user, { answer, context }]) => {
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
                  <For each={filelist}>
                    {({ fileUrl, fileName }) => (
                      <li>
                        <a href={fileUrl}>{fileName}</a>
                      </li>
                    )}
                  </For>
                </ul>
              );
            }
            if (contentHtml === undefined && filelistHtml === undefined) {
              return;
            }
            return (
              <>
                <p class={stateToClass(context?.state)}>
                  <strong>{user}</strong>
                </p>
                {contentHtml}
                {filelistHtml}
              </>
            );
          }}
        </For>
      );
    });
  }
}
