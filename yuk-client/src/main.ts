import { listenXhrOnLoad } from "./xhr.js";
import { getOpt } from "./utils.ts";
import { injectLoginButton } from "./inject.ts";

type Exam = {
  id: number;
  paper: Paper;
};

type Paper = {
  data: {
    title: string;
    problems: [
      {
        problem_id: number;
        // deno-lint-ignore no-explicit-any
        Options: [any];
      },
    ];
  };
};

type Answer = {
  // deno-lint-ignore camelcase
  problem_id: number;
  // deno-lint-ignore no-explicit-any
  result: any;
};

type PostAnswer = {
  results: Answer[];
};

function getExam(): Promise<Exam> {
  return new Promise((resolve) => {
    listenXhrOnLoad(function () {
      const url = new URL(this.responseURL);
      if (url.pathname == "/exam_room/show_paper") {
        const examId = url.searchParams.get("exam_id");
        if (examId === null) {
          throw new Error("no `exam_id` in url");
        }
        resolve({
          id: parseInt(examId),
          paper: JSON.parse(this.responseText),
        });
        return true;
      }
      return false;
    });
  });
}

getExam().then((exam) => {
  injectLoginButton(() => {
    // TODO: login here
    const username = getOpt("username", "用户名", "由字母、数字、下划线组成", (val) => {
      return val.length > 0 && val.length < 32;
    });
    console.log(username, exam.id, exam.paper.data.title);

    listenXhrOnLoad(function (data) {
      const url = new URL(this.responseURL);
      if (url.pathname === "/exam_room/answer_problem") {
        const answer: PostAnswer = JSON.parse(data);
        answer.results.forEach((ans) => {
          console.log(ans.problem_id, ans.result);
        });
      }
      return false;
    });
  });
});
