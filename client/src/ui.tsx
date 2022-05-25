import { Problem, UserAnswer } from "./types";
import classes from "./style.module.less";
import { openWin } from "./utils";
import * as UIRe from "./UI.bs.js";
import { render } from "solid-js/web";

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
  const win = openWin({ title: "上传图片", width: 400, height: 300 });
  render(
    () => (
      <div
        classList={{
          [classes.mainBody]: true,
          [classes.uploadImg]: true,
        }}
      >
        <div class={classes.uploadImgConfirm}>
          <button
            onClick={() => {
              win.close();
              cb();
            }}
          >
            确认上传
          </button>
          <span>
            <i>*关闭窗口以取消上传</i>
          </span>
        </div>
        <div class={classes.uploadImgImage}>
          <img src={dataURL} />
        </div>
      </div>
    ),
    win.document.body
  );
}
