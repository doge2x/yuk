import {
  Problem,
  ProblemType,
  ChoiceResult,
  BlankResult,
  ShortAnswerResult,
  isChoice,
} from "./types";
import { Map2, openWin } from "./utils";
import { locals as style } from "./style.mod.css";
import Recks from "./recks";

class Tooltip {
  private ele: HTMLElement;

  constructor(ele: Element) {
    if (ele instanceof HTMLElement) {
      this.ele = ele;
    } else {
      throw new Error("not a html element");
    }
  }

  get content(): string {
    return this.ele.title;
  }

  set content(val: string) {
    this.ele.title = val;
  }
}

function percent(n: number): string {
  return `${Math.floor(n * 100)}%`;
}

export class ProblemCard {
  private type: ProblemType;
  /**
   * Username => Result
   */
  private results: Map<string, any> = new Map();
  /**
   * Option key => Option Card
   */
  private options: Map<string, Tooltip>;
  private choiceMap: Map<string, string>;

  constructor(
    problem: Problem,
    choiceMap: Map<string, string>,
    subjectItem: Element
  ) {
    const type = problem.ProblemType;
    const options = new Map();

    const itemType = subjectItem.querySelector(".item-type") as HTMLElement;
    itemType.classList.add(style.clickable);
    itemType.addEventListener("click", () =>
      this.showAll(itemType.getBoundingClientRect())
    );

    // Init UI.
    switch (type) {
      case ProblemType.SingleChoice:
      case ProblemType.MultipleChoice:
      case ProblemType.Polling:
      case ProblemType.Judgement:
        subjectItem
          .querySelectorAll(".item-body .checkboxInput, .item-body .radioInput")
          .forEach((ele, idx) => {
            options.set(problem.Options![idx].key, new Tooltip(ele));
          });
        break;
      case ProblemType.FillBlank:
        subjectItem
          .querySelectorAll(".item-body .blank-item-dynamic")
          .forEach((ele, idx) => {
            options.set(`${idx + 1}`, new Tooltip(ele));
          });
        break;
    }

    this.type = type;
    this.options = options;
    this.choiceMap = choiceMap;
  }

  showAll({ left, top }: { left?: number; top?: number }) {
    const win = openWin("详细答案", {
      height: 150,
      width: 200,
      left: left,
      top: top,
    });
    const mainBody = <div classList={[style.mainBody, style.answerDetail]} />;
    win.document.body.append(mainBody);

    function Text(props: { title?: boolean; children?: any }) {
      return (
        <p className={props.title === true ? style.title : ""}>
          {props.children}
        </p>
      );
    }

    function UList(props: Recks.PropWithChildren<{}>) {
      return (
        <ul>
          {Array.isArray(props.children)
            ? props.children.map((ele) => <li>{ele}</li>)
            : props.children}
        </ul>
      );
    }

    switch (this.type) {
      case ProblemType.SingleChoice:
      case ProblemType.MultipleChoice:
      case ProblemType.Polling:
      case ProblemType.Judgement:
        // Choice
        //   - User1
        //   - User2
        const choiceToUsers = new Map2<string, string[]>(() => []);
        this.results.forEach((res: ChoiceResult, username) => {
          res.forEach((choice) => {
            if (this.type === ProblemType.Judgement) {
              choice = choice === "true" ? "正确" : "错误";
            } else if (isChoice(this.type)) {
              choice = this.choiceMap.get(choice)!;
            }
            choiceToUsers.setWith(choice, (users) => {
              users.push(username);
              return users;
            });
          });
        });
        [...choiceToUsers.entries()]
          .sort(([a], [b]) => (a < b ? -1 : 1))
          .forEach(([choice, users]) => {
            mainBody.append(
              <div>
                <Text title={true}>{choice}</Text>
                <UList>
                  {users.sort().map((user) => (
                    <Text>{user}</Text>
                  ))}
                </UList>
              </div>
            );
          });
        break;
      case ProblemType.FillBlank:
        // #Blank
        //   - result1
        //     - user1
        //     - user2
        const blankToResToUsers = new Map2<string, Map2<string, string[]>>(
          () => new Map2(() => [])
        );
        this.results.forEach((res: BlankResult, username) => {
          Object.entries(res).forEach(([key, ans]) => {
            blankToResToUsers.setWith(key, (val) => {
              val.setWith(ans, (users) => {
                users.push(username);
                return users;
              });
              return val;
            });
          });
        });
        [...blankToResToUsers.entries()]
          .sort(([a], [b]) => (a < b ? -1 : 1))
          .forEach(([blank, resToUsers]) => {
            mainBody.append(
              <div>
                <Text title={true}>{`#${blank}`}</Text>
                <UList>
                  {[...resToUsers]
                    .sort(([a], [b]) => (a < b ? -1 : 1))
                    .map(([res, users]) => (
                      <>
                        {<Text>{res}</Text>}
                        <UList>
                          {users.sort().map((user) => (
                            <Text>{user}</Text>
                          ))}
                        </UList>
                      </>
                    ))}
                </UList>
              </div>
            );
          });
        break;
      case ProblemType.ShortAnswer:
        // - User1
        //   <content>
        //   - File1
        //   - File2
        mainBody.append(
          <UList>
            {[...this.results.entries()]
              .sort(([a], [b]) => (a < b ? -1 : 1))
              .filter(([_, res]) => "content" in res)
              .map(([username, res]: [string, ShortAnswerResult]) => {
                return (
                  <>
                    <Text title={true}>{username}</Text>
                    <div>
                      <div
                        className={style.shorAnswer}
                        dangerouslySetInnerHTML={{ __html: res.content }}
                      />
                      <UList>
                        {(res.attachments?.filelist ?? []).map((atta) => (
                          <a href={atta.fileUrl}>{atta.fileName}</a>
                        ))}
                      </UList>
                    </div>
                  </>
                );
              })}
          </UList>
        );
        break;
    }
  }

  updateResult(username: string, result: any) {
    this.results.set(username, result);
  }

  updateUI() {
    // Reset tooltip of options.
    this.options.forEach((opt) => (opt.content = ""));
    switch (this.type) {
      // Tooltip show how many users have selected the option.
      case ProblemType.SingleChoice:
      case ProblemType.MultipleChoice:
      case ProblemType.Polling:
      case ProblemType.Judgement:
        const optCounter = new Map2<string, number>(() => 0);
        this.results.forEach((res: ChoiceResult) => {
          res.forEach((key) => {
            optCounter.setWith(key, (n) => n + 1);
          });
        });
        optCounter.forEach((num, key) => {
          this.options.get(key)!.content = `${percent(
            num / this.results.size
          )}`;
        });
        break;
      // Tooltip show the most popular answers.
      case ProblemType.FillBlank:
        const ansCounter = new Map2<string, Map2<string, number>>(
          () => new Map2(() => 0)
        );
        this.results.forEach((res: BlankResult) => {
          Object.entries(res).forEach(([key, text]) => {
            ansCounter.setWith(key, (counter) => {
              counter.setWith(text, (n) => n + 1);
              return counter;
            });
          });
        });
        ansCounter.forEach((counter, key) => {
          const [text, num] = [...counter.entries()]
            .sort(([_1, a], [_2, b]) => a - b)
            .pop()!;
          this.options.get(key)!.content = `(${percent(
            num / this.results.size
          )}) ${text}`;
        });
        break;
    }
  }
}
