import { Paper, Problem, ProblemDict, UserAnswer } from "./types";
import { locals as style, default as styleCss } from "./style.mod.css";
import { ProblemCard } from "./card";
import Recks from "./recks";
import { showSettings } from "./settings";

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
        cards.set(prob.problem_id, new ProblemCard(prob, subjectItem));
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
