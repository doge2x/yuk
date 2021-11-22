import { CacheResults, Exam, Paper, PostAnswer } from "./types";
import { sortProblems } from "./paper";

interface XhrWithOpenUrl extends XMLHttpRequest {
  _$openUrl: URL;
}

interface XhrWithPaper extends XMLHttpRequest {
  _$paper: Paper;
}

export function listenPostAnswer(callback: (data: PostAnswer) => void) {
  const xhrOpen = XMLHttpRequest.prototype.open;
  const xhrSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (_method, openUrl) {
    // Save open url.
    (this as XhrWithOpenUrl)._$openUrl = new URL(openUrl, self.location.href);

    xhrOpen.apply(this, arguments as any);
  };

  XMLHttpRequest.prototype.send = function (body) {
    const url = new URL((this as XhrWithOpenUrl)._$openUrl);
    if (url.pathname === "/exam_room/answer_problem") {
      // Callback with posted answers.
      callback.call(this, JSON.parse(body as string));
    }

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
              this.readyState === XMLHttpRequest.DONE &&
              this.status === 200
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

      xhrOpen.apply(this, arguments as any);
    };
  });
}

export async function fetchCacheResults(examId: number): Promise<CacheResults> {
  const rsp = await fetch(`/exam_room/cache_results?exam_id=${examId}`);
  return await rsp.json();
}
