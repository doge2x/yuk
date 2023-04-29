import {
  Accessor,
  createEffect,
  createMemo,
  createRoot,
  createSignal,
  For,
  JSX,
  Show,
} from "solid-js";
import style from "./style.module.less";
import {
  AnswerContext,
  AnswerState,
  BlankResult,
  ChoiceResult,
  ShortResult,
} from "./types";
import { assertIs, openWin, Opt, tuple } from "./utils";
import { render } from "solid-js/web";
import { CLIENT } from "./client";
import { It, Pipe } from "./utils";

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
      const itemType = subjectItem.querySelector(".item-type");
      assertIs(HTMLElement, itemType);
      itemType.classList.add(style.clickable);
      itemType.addEventListener("click", () => {
        const rect = itemType?.getBoundingClientRect();
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
                <legend>{`注册人数: ${totalUser(details())}`}</legend>
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
                {Pipe.from(details())
                  .then(It.sort(cmpNameWithAnswerAndCtx))
                  .then(
                    It.filterMap(([user, { context }]) =>
                      Pipe.from(context?.state)
                        .then(Opt.or2(context?.msg))
                        .then(
                          Opt.map(([state, msg]) => {
                            const m =
                              state === AnswerState.WorkingOn
                                ? msg ?? "我正在做"
                                : msg;
                            return m === undefined || m === ""
                              ? undefined
                              : tuple(user, state, m);
                          })
                        )
                        .unwrap()
                    )
                  )
                  .then(It.collectArray)
                  .then((messages) => (
                    <Show when={messages.length > 0}>
                      {
                        <fieldset class={style.answerMsg}>
                          <legend> 留言 </legend>
                          <ul>
                            <For each={messages}>
                              {([user, state, msg]) => (
                                <li class={stateToClass(state)}>
                                  <span
                                    class={style.answerMsgName}
                                  >{`${user}: `}</span>
                                  {msg}
                                </li>
                              )}
                            </For>
                          </ul>
                        </fieldset>
                      }
                    </Show>
                  ))
                  .unwrap()}
                <div class={style.answerDetail}>
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

function clearTooltips(t: Map<string, Tooltip>) {
  t.forEach((t) => t.setContent(""));
}

function totalUser<T>(t: DetailsData<T>): number {
  return Pipe.from(t)
    .then(It.filter(([, x]) => x.answer !== undefined))
    .then(It.count)
    .unwrap();
}

function Users({ children }: { children: Users }): JSX.Element {
  return (
    <ul>
      <For each={children.sort(cmpNameWithCtx)}>
        {([user, ctx]) => <li class={stateToClass(ctx?.state)}>{user}</li>}
      </For>
    </ul>
  );
}

export class Choice extends Details<ChoiceResult> {
  constructor(
    id: number,
    subjectItem: Element,
    index2choice: (i: number) => string,
    choiceMap: (s: string) => string
  ) {
    const tooltips = Pipe.from(
      subjectItem.querySelectorAll(
        ".item-body .checkboxInput, .item-body .radioInput"
      )
    )
      .then((t) => Array.from(t).entries())
      .then(
        It.fold(new Map<string, Tooltip>(), (tooltips, [idx, ele]) =>
          tooltips.set(index2choice(idx), new Tooltip(ele))
        )
      )
      .unwrap();

    super(id, subjectItem, (details) => {
      // (choice, (user, context?)[])[]
      const choiceToUsers = createMemo(() =>
        Pipe.from(details())
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
          .unwrap()
      );

      // Update tooltips to show how many users select the choices.
      createEffect(() => {
        const total = totalUser(details());
        clearTooltips(tooltips);
        Pipe.from(choiceToUsers())
          .then(
            It.forEach(([choice, users]) => {
              tooltips.get(choice)?.setContent(percent(users.length, total));
            })
          )
          .unwrap();
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
              <Users>{users}</Users>
            </div>
          )}
        </For>
      );
    });
  }
}

export class Blank extends Details<BlankResult> {
  constructor(id: number, subjectItem: Element) {
    const tooltips = Pipe.from(
      subjectItem.querySelectorAll(".item-body .blank-item-dynamic")
    )
      .then<Element[]>(Array.from)
      .then(It.enumerate)
      .then(
        It.fold(new Map<string, Tooltip>(), (tooltips, [idx, ele]) =>
          tooltips.set(String.fromCharCode(idx + 49), new Tooltip(ele))
        )
      )
      .unwrap();

    super(id, subjectItem, (details) => {
      // (blank, (fill, Users)[])[]
      const blankToFillToUsers = () =>
        Pipe.from(details())
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
                return Pipe.from(answer)
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
                  .unwrap();
              }
            )
          )
          .then(
            It.map(([blank, fillToUsers]) =>
              tuple(
                blank,
                // Sory by filled text.
                Pipe.from(fillToUsers)
                  .then(It.sort(cmpByKey))
                  .then(It.collectArray)
                  .unwrap()
              )
            )
          )
          // Sort by blank ID.
          .then(It.sort(cmpByKey))
          .then(It.collectArray)
          .unwrap();

      // Update tooltips to show the most popular answers.
      createEffect(() => {
        const total = totalUser(details());
        clearTooltips(tooltips);
        Pipe.from(blankToFillToUsers())
          .then(
            It.forEach(([blank, fillToUsers]) => {
              const most = Pipe.from(fillToUsers)
                .then(It.map(([fill, users]) => tuple(fill, users.length)))
                .then(It.sort(([, a], [, b]) => b - a))
                .then(It.first)
                .unwrap();
              tooltips
                .get(blank)
                ?.setContent(
                  most === undefined
                    ? ""
                    : `(${percent(most[1], total)}) ${most[0]}`
                );
            })
          )
          .unwrap();
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
                  {([fill, users]) => (
                    <Show when={fill !== ""}>
                      <li>
                        <p class={style.answerDetailFill}>{fill}</p>
                        <Users>{users}</Users>
                      </li>
                    </Show>
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

export class ShortAnswer extends Details<ShortResult> {
  constructor(id: number, subjectItem: Element) {
    super(id, subjectItem, (details) => {
      const userToAnswers = createMemo(() =>
        Pipe.from(details())
          .then(It.sort(cmpNameWithAnswerAndCtx))
          .then(It.collectArray)
          .unwrap()
      );
      return () => (
        // user
        // <content>
        // - filelist
        <For
          each={Pipe.from(userToAnswers())
            .then(
              It.filterMap(([user, { answer, context }]) =>
                Pipe.from(answer?.content)
                  .then(Opt.or2(answer?.attachments?.filelist))
                  .then(Opt.map(([c, f]) => tuple(user, c, f, context?.state)))
                  .unwrap()
              )
            )
            .then(It.collectArray)
            .unwrap()}
        >
          {([user, content, filelist, state]) => (
            <>
              <p class={stateToClass(state)}>
                <strong>{user}</strong>
              </p>
              <Show when={content}>
                {(content) => (
                  <div
                    class={style.answerDetailShortAnswer}
                    innerHTML={content()}
                  />
                )}
              </Show>
              <Show when={filelist}>
                {(filelist) => (
                  <ul>
                    <For each={filelist()}>
                      {({ fileUrl, fileName }) => (
                        <li>
                          <a href={fileUrl}>{fileName}</a>
                        </li>
                      )}
                    </For>
                  </ul>
                )}
              </Show>
            </>
          )}
        </For>
      );
    });
  }
}
