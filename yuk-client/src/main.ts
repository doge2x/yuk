import { listenXhrOnLoad } from "./xhr.ts";
import { GMOpt } from "./utils.ts";
import { injectLoginButton } from "./inject.ts";
import { Connection } from "./ws.ts";
import { Answer } from "./msg.ts";

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

export type PostAnswer = {
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

let LOGIN = false;

const USERNAME_OPT = new GMOpt(
  "username",
  "用户名",
  "由字母、数字、下划线组成",
  (val) => {
    return val.length > 0 && val.length < 32 && /^[_a-zA-Z]\w+$/.test(val);
  },
);
const SERVER_ADDR_OPT = new GMOpt(
  "server_addr",
  "服务器地址",
  "例如：localhost:9009",
);

getExam().then((exam) => {
  injectLoginButton(() => {
    if (LOGIN) {
      // TODO: hide answers
    } else {
      const username = USERNAME_OPT.getOrSet();
      const serverAddr = SERVER_ADDR_OPT.getOrSet();
      console.log(username, serverAddr, exam.id, exam.paper.data.title);

      Connection.new(
        `ws://${serverAddr}/login?username=${username}&exam_id=${exam.id}`,
      )
        .then((conn) => {
          LOGIN = true;
          conn.onmessage = (answers) =>
            answers.forEach((ans) =>
              console.log(ans.username, JSON.stringify(ans.answers))
            );
          listenXhrOnLoad(function (data) {
            const url = new URL(this.responseURL);
            if (url.pathname === "/exam_room/answer_problem") {
              const answer: PostAnswer = JSON.parse(data);
              conn.send(answer.results);
            }
            return false;
          });
        }).catch((e) => self.alert(`与服务器通信时发生错误：${e}`));
    }
  });
});
