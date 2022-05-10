import { Client } from "./client";
import { hookXHR } from "./xhr";
import {
  PostAnswer,
  Paper,
  isChoice,
  ChoiceOption,
  CacheResults,
} from "./types";
import { UI } from "./ui";
import { devLog, newURL, openWin } from "./utils";
import { EXAM_ID } from "./context";
import Recks from "./recks";
import { locals as style } from "./style.mod.css";

export function sortPaper(paper: Paper): Paper {
  paper.data.problems.sort((a, b) => a.problem_id - b.problem_id);
  paper.data.problems.forEach((problem) => {
    if (isChoice(problem.ProblemType)) {
      (problem.Options as ChoiceOption[]).sort((a, b) => {
        return a.key < b.key ? -1 : 1;
      });
    }
  });
  return paper;
}

function removeVisibilityListener() {
  document.addEventListener(
    "visibilitychange",
    (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    true
  );
  window.addEventListener(
    "visibilitychange",
    (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    true
  );
}

async function main(): Promise<void> {
  // removeVisibilityListener();
  const client = new Client();
  hookXHR(function (url) {
    switch (url.pathname) {
      case "/exam_room/show_paper":
        this.addEventListener("readystatechange", () => {
          if (this.readyState == XMLHttpRequest.DONE) {
            // Sort problems.
            const text = JSON.stringify(
              sortPaper(JSON.parse(this.responseText))
            );
            // Modify response text.
            Object.defineProperties(this, {
              responseText: {
                get() {
                  return text;
                },
              },
            });
          }
        });
        this.addEventListener("load", () => {
          // Login to server.
          const ui = new UI(JSON.parse(this.responseText));
          // Receive answers and update UI.
          client.onmessage((msg) => {
            msg.forEach((res) => ui.updateAnswer(res));
            ui.updateUI();
          });
          (async () => {
            // Fetch cached results.
            EXAM_ID.value = parseInt(url.searchParams.get("exam_id")!);
            const cacheResults: CacheResults = await fetch(
              newURL("/exam_room/cache_results", {
                exam_id: EXAM_ID.value.toString(),
              }).toString()
            ).then((res) => res.json());
            client.answerProblem(cacheResults.data.results);
          })().catch(devLog);
        });
        break;
      case "/exam_room/answer_problem":
        return async (body) => {
          // Upload answers.
          if (typeof body === "string") {
            const data = JSON.parse(body);
            // Dont report abnormal behavior.
            if ("action" in data) {
              switch (data.action) {
                // 离开页面
                case 12:
                // 返回页面
                case 16:
                // 上传桌面截屏
                // case 17:
                // 取消共享窗口
                case 19:
                  return new Promise(() => undefined);
              }
            }
            client.answerProblem(data.results ?? []).catch(devLog);
          }
          return body;
        };
      default:
        if (url.hostname === "upload-z1.qiniup.com") {
          // Prevent upload screenshot.
          return async (body) => {
            if (body instanceof FormData && body.get("file") instanceof File) {
              return new Promise((ok) => {
                const f = new FileReader();
                f.onload = () => {
                  const win = openWin("上传图片", {
                    width: 300,
                    height: 200,
                  });
                  win.document.body.append(
                    <div classList={[style.uploadImg, style.mainBody]}>
                      <div>
                        <button
                          on-click={() => {
                            ok(body);
                            win.close();
                          }}
                          classList={[style.confirmUpload]}
                          type="button"
                        >
                          {"确认上传"}
                        </button>
                      </div>
                      <div classList={[style.imageContainer]}>
                        <img src={f.result as any} />
                      </div>
                    </div>
                  );
                };
                f.readAsDataURL(body.get("file") as File);
              });
            }
            return body;
          };
        }
    }
  });
  await client.watch(DEV_MODE ? 1 : 1e4);
}

if (DEV_MODE) {
  console.warn("IN DEV_MODE");
}
main().catch(console.error);
