import { Problem, ProblemType, Result, UserAnswer } from "./types";
import style from "./style.module.less";
import styleCss from "./style.module.less?inline";
import { assert, assertIs, openWin, Opt } from "./utils";
import { render } from "solid-js/web";
import { Details, Choice, Blank, ShortAnswer } from "./Details";
import { It, Pipe } from "./utils";
import { showSettings } from "./Settings";

export class UI {
  private readonly _details: Map<number, Details<Result>>;

  constructor(problems: Problem[]) {
    // Inject CSS.
    render(() => <style textContent={styleCss} />, document.head);

    // Inject settings.
    const header = document.body.querySelector(".header-title");
    assertIs(HTMLElement, header);
    header.classList.add(style.clickable);
    header.addEventListener("click", () => showSettings());

    // Inject answer details.
    const subjectItems = Array.from(
      document.body.querySelectorAll(".exam-main--body .subject-item")
    );
    assert(
      subjectItems.length === problems.length,
      "number subject items mismatches problems"
    );
    this._details = Pipe.from(subjectItems)
      .then(It.zip(problems))
      .then(
        It.fold(
          new Map<number, Details<Result>>(),
          (details, [subjectItem, prob]) => {
            let detail;
            switch (prob.ProblemType) {
              case ProblemType.SingleChoice:
              case ProblemType.MultipleChoice:
              case ProblemType.Polling:
              case ProblemType.Judgement: {
                const index2choice: (i: number) => string =
                  prob.ProblemType === ProblemType.Judgement
                    ? (i) => ["正确", "错误"][i]
                    : (i) => String.fromCharCode(65 + i);
                // Map answers to what user sees.
                const choiceMap =
                  prob.ProblemType === ProblemType.Judgement
                    ? new Map([
                        ["true", "正确"],
                        ["false", "错误"],
                      ])
                    : Pipe.from(prob.Options)
                        .then(Opt.expect("no Options"))
                        .then(It.enumerate)
                        .then(
                          It.fold(
                            new Map<string, string>(),
                            (choiceMap, [idx, { key }]) =>
                              choiceMap.set(key, String.fromCharCode(65 + idx))
                          )
                        )
                        .unwrap();
                detail = new Choice(
                  prob.ProblemID,
                  subjectItem,
                  index2choice,
                  (s) => choiceMap.get(s) ?? s
                );
                break;
              }
              case ProblemType.FillBlank:
                detail = new Blank(prob.ProblemID, subjectItem);
                break;
              case ProblemType.ShortAnswer:
                detail = new ShortAnswer(prob.ProblemID, subjectItem);
                break;
            }
            return details.set(prob.ProblemID, detail);
          }
        )
      )
      .unwrap();
  }

  updateAnswer({ username, problem_id, result, context }: UserAnswer) {
    this._details
      .get(problem_id)
      ?.updateAnswer(username, { answer: result, context });
  }

  updateUI() {
    this._details.forEach((d) => d.updateUI());
  }
}

export function showConfirmUpload(dataURL: string, cb: () => void) {
  const win = openWin({ title: "上传图片", width: 400, height: 300 });
  render(
    () => (
      <div
        classList={{
          [style.mainBody]: true,
          [style.uploadImg]: true,
        }}
      >
        <div class={style.uploadImgConfirm}>
          <button
            type="button"
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
        <div class={style.uploadImgImage}>
          <img src={dataURL} />
        </div>
      </div>
    ),
    win.document.body
  );
}
