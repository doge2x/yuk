import { Paper, Problem, ProblemDict, UserAnswer } from "./types";
import { locals as style, default as styleCss } from "./style.mod.css";
import { ProblemCard } from "./card";
import Recks from "./recks";
import { showSettings } from "./settings";
import { Map2, openWin } from "./utils";

export const CHOICE_MAP: Map2<number, Map<string, string>> = new Map2(
  () => new Map()
);

export class UI {
  private problems: Map<number, ProblemCard>;

  constructor(paper: Paper) {
    // Header.
    document.head.append(<style>{styleCss.toString()}</style>);
    const header = document.body.querySelector(".header-title") as HTMLElement;
    header.classList.add(style.clickable);
    header.addEventListener("click", () => {
      showSettings();
    });
    let problems: Problem[] = [];
    if (paper.data.has_problem_dict === true) {
      (paper.data.problems as ProblemDict[]).forEach((dict) => {
        problems = problems.concat(dict.problems);
      });
    } else {
      problems = paper.data.problems as Problem[];
    }

    // Problem cards.
    const cards = new Map();
    document.body
      .querySelectorAll(".exam-main--body .subject-item")
      .forEach((subjectItem, idx) => {
        const prob = problems[idx];
        cards.set(
          prob.problem_id,
          new ProblemCard(prob, CHOICE_MAP.get(prob.problem_id)!, subjectItem)
        );
      });
    this.problems = cards;
  }

  updateAnswer({ username, problem_id, result }: UserAnswer) {
    this.problems.get(problem_id)?.updateResult(username, result);
  }

  updateUI() {
    this.problems.forEach((card) => card.updateUI());
  }
}

export function showConfirmUpload(dataURL: string, cb: () => void) {
  const win = openWin("上传图片", {
    width: 300,
    height: 200,
  });
  win.document.body.append(
    <div classList={[style.uploadImg, style.mainBody]}>
      <div classList={[style.confirmUpload]}>
        <button
          on-click={() => {
            cb();
            win.close();
          }}
          classList={[style.confirmBUtton]}
          type="button"
        >
          {"确认上传"}
        </button>
        <span>
          <i>{"*关闭窗口以取消上传"}</i>
        </span>
      </div>
      <div classList={[style.imageContainer]}>
        <img src={dataURL} />
      </div>
    </div>
  );
}
