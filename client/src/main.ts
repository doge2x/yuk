import { CLIENT } from "./client";
import { hookXHR } from "./xhr";
import {
  Paper,
  ChoiceOption,
  CacheResults,
  Problem,
  ProblemDict,
  ProblemType,
  PostAnswer,
} from "./types";
import { UI, showConfirmUpload } from "./ui";
import { devLog, isDevMode, newURL } from "./utils";
import { NO_LEAVE_CHECK, SORT_PROBLEMS } from "./shared";
import { migrate } from "./gm";

function sortProblems(problems: Problem[]): Problem[] {
  problems.forEach((problem) => {
    switch (problem.ProblemType) {
      case ProblemType.SingleChoice:
      case ProblemType.MultipleChoice:
      case ProblemType.Polling: {
        const options = problem.Options as ChoiceOption[];
        options.sort((a, b) => {
          return a.key < b.key ? -1 : 1;
        });
        break;
      }
    }
  });
  problems.sort((a, b) => a.ProblemID - b.ProblemID);
  return problems;
}

function sortPaper(paper: Paper): Paper {
  if (SORT_PROBLEMS.value === true) {
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
  }
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
  migrate();
  if (NO_LEAVE_CHECK.value === true) {
    removeVisibilityListener();
  }
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
          const paper: Paper = JSON.parse(this.responseText);
          devLog("intercept paper", paper);
          // Collect problems.
          let problems: Problem[] = [];
          if (paper.data.has_problem_dict === true) {
            (paper.data.problems as ProblemDict[]).forEach((dict) => {
              problems = problems.concat(dict.problems);
            });
          } else {
            problems = paper.data.problems as Problem[];
          }
          // Login to server.
          const ui = new UI(problems);
          // Receive answers and update UI.
          CLIENT.onmessage((msg) => {
            msg.forEach((res) => ui.updateAnswer(res));
            ui.updateUI();
          });
          const examId = parseInt(url.searchParams.get("exam_id")!);
          // Login to server.
          CLIENT.login(examId, { title: paper.data.title, problems: problems });
          // Fetch cached results.
          fetch(
            newURL("/exam_room/cache_results", {
              exam_id: examId.toString(),
            }).toString()
          )
            .then((res) => res.json())
            .then((cacheResults: CacheResults) =>
              cacheResults.data.results.forEach(({ problem_id, result }) =>
                CLIENT.updateAnswer(problem_id, result)
              )
            )
            .catch(devLog);
        });
        return;
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
              (data as PostAnswer).results?.forEach(({ problem_id, result }) =>
                CLIENT.updateAnswer(problem_id, result)
              );
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
                f.onload = () =>
                  showConfirmUpload(f.result as string, () => ok(body));
                f.readAsDataURL(body.get("file") as File);
              });
            }
            return body;
          };
        }
        return;
    }
  });
  await CLIENT.watch(isDevMode() ? 0 : 1e4);
}

if (isDevMode()) {
  console.warn("IN DEV_MODE");
}
main().catch(console.error);
