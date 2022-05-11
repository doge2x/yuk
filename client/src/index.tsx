import { Client } from "./client";
import { hookXHR } from "./xhr";
import {
  Paper,
  isChoice,
  ChoiceOption,
  CacheResults,
  Problem,
  ProblemDict,
} from "./types";
import { UI, CHOICE_MAP } from "./ui";
import { devLog, newURL, openWin } from "./utils";
import { EXAM_ID, NO_LEAVE_CHECK, SORT_PROBLEMS } from "./config";
import Recks from "./recks";
import { locals as style } from "./style.mod.css";

function sortProblems(problems: Problem[]): Problem[] {
  if (SORT_PROBLEMS.value === true) {
    problems.sort((a, b) => a.problem_id - b.problem_id);
  }
  problems.forEach((problem) => {
    // Options must be sorted to ensure the answers users saw are the same.
    if (isChoice(problem.ProblemType)) {
      const options = problem.Options as ChoiceOption[];
      if (SORT_PROBLEMS.value === true) {
        options.sort((a, b) => {
          return a.key < b.key ? -1 : 1;
        });
      }
      options.forEach((cho, idx) => {
        CHOICE_MAP.setWith(problem.problem_id, (m) =>
          m.set(cho.key, String.fromCharCode(65 + idx))
        );
      });
    }
  });
  return problems;
}

function sortPaper(paper: Paper): Paper {
  if (paper.data.has_problem_dict === true) {
    paper.data.problems = (paper.data.problems as ProblemDict[])
      .sort((a, b) => a.id - b.id)
      .map((d) => {
        d.problems = sortProblems(d.problems);
        return d;
      });
  } else {
    paper.data.problems = sortProblems(paper.data.problems as Problem[]);
  }
  devLog(CHOICE_MAP);
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
  if (NO_LEAVE_CHECK.value === true) {
    removeVisibilityListener();
  }
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
          const paper = JSON.parse(this.responseText);
          devLog("intercept paper", paper);
          // Login to server.
          const ui = new UI(paper);
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
                // 上传截图
                case 1:
                // 上传桌面截屏
                case 17:
                  break;
                default:
                  console.log("intercept action", data);
                  return new Promise(() => undefined);
              }
            } else if ("results" in data) {
              devLog("intercept answers", data);
              client.answerProblem(data.results ?? []).catch(devLog);
            }
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
