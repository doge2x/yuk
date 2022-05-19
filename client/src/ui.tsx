import { Paper, Problem, ProblemDict, UserAnswer } from "./types";
import * as UIRe from "./UI.bs";

export class UI {
  private inner: any;

  constructor(paper: Paper) {
    // Collect problems.
    let problems: Problem[] = [];
    if (paper.data.has_problem_dict === true) {
      (paper.data.problems as ProblemDict[]).forEach((dict) => {
        problems = problems.concat(dict.problems);
      });
    } else {
      problems = paper.data.problems as Problem[];
    }
    this.inner = UIRe.UI.make(problems);
  }

  updateAnswer({ username, problem_id, result, context }: UserAnswer) {
    UIRe.UI.updateAnswer(this.inner, problem_id, username, {
      answer: result,
      context: context,
    });
  }

  updateUI() {
    UIRe.UI.updateUI(this.inner);
  }
}

export function showConfirmUpload(dataURL: string, cb: () => void) {
  UIRe.showConfirmUpload(dataURL, cb);
}
