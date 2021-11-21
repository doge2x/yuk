import { Exam, Paper, PostAnswer } from "./types.ts";
import { sortProblems } from "./paper.ts";

interface XhrWithOpenUrl extends XMLHttpRequest {
  _$openUrl: URL;
}

interface XhrWithPaper extends XMLHttpRequest {
  _$paper: Paper;
}

export function listenPostAnswer(
  callback: (data: PostAnswer) => void,
) {
  const xhrOpen = XMLHttpRequest.prototype.open;
  const xhrSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (_method, openUrl) {
    // Save open url.
    (this as XhrWithOpenUrl)._$openUrl = new URL(openUrl, self.location.href);
    // deno-lint-ignore no-explicit-any
    xhrOpen.apply(this, arguments as any);
  };

  XMLHttpRequest.prototype.send = function (body) {
    const url = new URL((this as XhrWithOpenUrl)._$openUrl);
    if (url.pathname === "/exam_room/answer_problem") {
      // Callback with posted answers.
      callback.call(this, JSON.parse(body as string));
    }
    // deno-lint-ignore no-explicit-any
    xhrSend.apply(this, arguments as any);
  };
}

export function getPaper(): Promise<Exam> {
  return new Promise((resolve, reject) => {
    const xhrOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (_method, openUrl) {
      const url = new URL(openUrl, self.location.href);
      if (url.pathname == "/exam_room/show_paper") {
        // Restore `open`.
        XMLHttpRequest.prototype.open = xhrOpen;
        const examId = url.searchParams.get("exam_id");
        if (examId === null) {
          reject(new Error("no `exam_id` in url"));
        } else {
          // Modify `responseText` when ready state of request changed.
          this.addEventListener("readystatechange", () => {
            if (
              this.readyState === XMLHttpRequest.DONE && this.status === 200
            ) {
              // Sort problems.
              const paper = sortProblems(JSON.parse(this.responseText));
              (this as XhrWithPaper)._$paper = paper;
              // Proxy property `responseText`.
              const responseText = JSON.stringify(paper);
              Object.defineProperty(this, "responseText", {
                get() {
                  return responseText;
                },
              });
            }
          });
          // Resolve promise when request is finished.
          this.addEventListener("load", () => {
            resolve({
              id: parseInt(examId),
              paper: (this as XhrWithPaper)._$paper,
            });
          });
        }
      }
      // deno-lint-ignore no-explicit-any
      xhrOpen.apply(this, arguments as any);
    };
  });
}
