import { Client } from "./client";
import { hookXHR, newURL } from "./xhr";
import {
  PostAnswer,
  Paper,
  isChoice,
  ChoiceOption,
  CacheResults,
} from "./types";
import { SERVER, UI, USERNAME } from "./ui";

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

async function login(
  server: string,
  username: string
): Promise<{ client: Client; examId: string; paper: Paper }> {
  return hookXHR(function (url) {
    return new Promise((ok) => {
      if (url.pathname === "/exam_room/show_paper") {
        // this.addEventListener("readystatechange", () => {
        //   if (this.readyState == XMLHttpRequest.DONE) {
        //     // Sort problems.
        //     const text = JSON.stringify(
        //       sortPaper(JSON.parse(this.responseText))
        //     );
        //     // Modify response text.
        //     Object.defineProperties(this, {
        //       responseText: {
        //         get() {
        //           return text;
        //         },
        //       },
        //     });
        //   }
        // });
        this.addEventListener("load", () => {
          // Login to server.
          const examId = url.searchParams.get("exam_id")!;
          ok(
            Client.login(server, username, parseInt(examId)).then((client) => ({
              client: client,
              examId: examId,
              paper: JSON.parse(this.responseText),
            }))
          );
        });
      }
    });
  });
}

async function main() {
  const username = await USERNAME.getValue();
  const server = await SERVER.getValue();
  const { client, examId, paper } = await login(server, username);
  // Initialize UI.
  const ui = new UI(paper);
  console.log(paper);
  // Receive answers and update UI.
  client.onmessage((msg) => {
    console.log(msg);
    msg.forEach((res) => ui.updateAnswer(res));
    ui.updateUI();
  });
  // Upload cached results.
  const cacheResults: CacheResults = await fetch(
    newURL("/exam_room/cache_results", { exam_id: examId }).toString()
  ).then((res) => res.json());
  await client.answerProblem(cacheResults.data.results);
  // Upload answers.
  await hookXHR(async (url, body) => {
    return new Promise(async () => {
      if (url.pathname === "/exam_room/answer_problem") {
        const data: PostAnswer = JSON.parse(await body);
        console.log(data);
        await client.answerProblem(data.results);
      }
    });
  });
}

main().catch(console.error);
