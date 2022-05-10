import { Paper, UserAnswer } from "./types";
import { locals as style, default as styleCss } from "./style.mod.css";
import { devLog, openWin } from "./utils";
import { ProblemCard } from "./card";
import Recks from "./recks";
import { SERVER, USERNAME } from "./context";

export class UI {
  private problems: Map<number, ProblemCard>;

  constructor(paper: Paper) {
    // Header.
    document.head.append(<style>{styleCss.toString()}</style>);
    const header = document.body.querySelector(".header-title") as HTMLElement;
    header.classList.add(style.clickable);
    header.addEventListener("click", () => {
      const win = openWin("设置", { height: 150, width: 200 });

      function SettingsEntry(props: {
        name: string;
        title: string;
        pattern?: string;
        size?: number;
        value?: string;
      }) {
        return (
          <div classList={[style.settingsEntry]}>
            <label htmlFor={props.name}>{props.title}</label>
            <input
              type="text"
              required={true}
              name={props.name}
              title={props.title}
              pattern={props.pattern}
              size={props.size}
              value={props.value}
            />
          </div>
        );
      }

      win.document.body.append(
        <div classList={[style.mainBody, style.settings]}>
          <form
            onsubmit={() => false}
            on-submit={function () {
              const form = new FormData(this);
              USERNAME.setValue(form.get("username") as any).catch(devLog);
              SERVER.setValue(form.get("server") as any).catch(devLog);
              for (const v of form) {
                console.log(v);
              }
              win.close();
            }}
          >
            <SettingsEntry
              name="username"
              title="用户名"
              pattern={"[_a-z][_a-z0-9]*"}
              size={10}
              value={USERNAME.value ?? undefined}
            />
            <SettingsEntry
              name="server"
              title="服务器地址"
              pattern={".*"}
              size={15}
              value={SERVER.value ?? undefined}
            />
            <div classList={[style.settingsSubmit]}>
              <input type="submit" value="提交" size={10} />
            </div>
          </form>
          <div classList={[style.about]}>
            <p>
              <strong>{"功能特性："}</strong>
            </p>
            <ul>
              <li>
                <strong>{"同步答案："}</strong>
                {"点击题目显示详细答案，在选项/填空处悬停鼠标显示简略答案"}
              </li>
              <li>
                <strong>{"阻止上传截图："}</strong>
                {"仅当用户确认时，才会上传截图"}
              </li>
              <li>
                <strong>{"阻止提交异常状态："}</strong>
                {"即使页面显示异常状态也不会被提交到服务器"}
              </li>
            </ul>
          </div>
        </div>
      );
    });
    // Problem cards.
    const problems = new Map();
    document.body
      .querySelectorAll(".exam-main--body div .subject-item")
      .forEach((subjectItem, idx) => {
        const prob = paper.data.problems[idx];
        problems.set(prob.problem_id, new ProblemCard(prob, subjectItem));
      });
    this.problems = problems;
  }

  updateAnswer({ username, problem_id, result }: UserAnswer) {
    this.problems.get(problem_id)?.updateResult(username, result);
  }

  updateUI() {
    this.problems.forEach((card) => card.updateUI());
  }
}
