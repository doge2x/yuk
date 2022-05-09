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
import { devLog, newURL } from "./utils";
import { EXAM_ID } from "./context";

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
  const toDataURL = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function (
    type?: string,
    quality?: any
  ) {
    console.log(type, quality, this.height, this.width);
    return toDataURL.call(this, type, quality);
  };
  removeVisibilityListener();
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
        return true;
      case "/exam_room/answer_problem":
        return async (body) => {
          // Upload answers.
          if (typeof body === "string") {
            const data: PostAnswer = JSON.parse(body);
            client.answerProblem(data.results ?? []).catch(devLog);
          }
          return body;
        };
      default:
        if (url.hostname === "upload-z1.qiniup.com") {
          // Fake screenshot.
          return async (body) => {
            if (body instanceof FormData && body.get("file") instanceof File) {
              console.log(body.get("file"));
            }
            return body;
          };
        } else {
          return true;
        }
    }
  });
  await client.watch(DEV_MODE ? 1 : 1e4);
}

if (DEV_MODE) {
  console.warn("IN DEV_MODE");
}
main().catch(console.error);
