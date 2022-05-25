import { Problem, UserAnswer } from "./types";
import * as UIRe from "./UI.bs.js";

export class UI {
  private inner: any;

  constructor(problems: Problem[]) {
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
