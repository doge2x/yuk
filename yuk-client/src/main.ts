import { getPaper, listenPostAnswer } from "./xhr.ts";
import { GMOpt } from "./utils.ts";
import { injectLoginButton } from "./inject.ts";
import { Connection } from "./ws.ts";

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

getPaper().then((exam) => {
  injectLoginButton(() => {
    if (LOGIN) {
      // TODO: hide answers
    } else {
      const username = USERNAME_OPT.getOrSet();
      const serverAddr = SERVER_ADDR_OPT.getOrSet();
      const wsAddr =
        `ws://${serverAddr}/login?username=${username}&exam_id=${exam.id}`;
      console.log(`Login: ${wsAddr}`);

      Connection.connect(wsAddr)
        .then((conn) => {
          LOGIN = true;
          conn.onmessage = (answers) =>
            answers.forEach((ans) =>
              console.log(ans.username, JSON.stringify(ans.answers))
            );
          listenPostAnswer(function (answer) {
            conn.send(answer.results);
          });
        }).catch((e) => self.alert(`与服务器通信时发生错误：${e}`));
    }
  });
});
