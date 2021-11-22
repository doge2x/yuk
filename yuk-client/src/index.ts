import { fetchCacheResults, getPaper, listenPostAnswer } from "./xhr";
import { GMOpt } from "./utils";
import { injectLoginButton } from "./inject";
import { Connection } from "./ws";

const USERNAME_OPT = new GMOpt(
  "username",
  "用户名",
  "由字母、数字、下划线组成",
  (val) => {
    return val.length > 0 && val.length < 32 && /^[_a-zA-Z]\w+$/.test(val);
  }
);
const SERVER_ADDR_OPT = new GMOpt(
  "server_addr",
  "服务器地址",
  "例如：localhost:9009"
);

let LOGIN = false;

getPaper().then((exam) => {
  injectLoginButton(() => {
    if (LOGIN) {
      // TODO: hide answers
    } else {
      const username = USERNAME_OPT.getOrSet();
      const serverAddr = SERVER_ADDR_OPT.getOrSet();
      const wsAddr = `ws://${serverAddr}/login?username=${username}&exam_id=${exam.id}`;
      console.log(`Login: ${wsAddr}`);
      // Connected to the server.
      Connection.connect(wsAddr)
        .then((conn) => {
          LOGIN = true;
          // Handle received messages.
          conn.onmessage = (answers) =>
            console.log(`Message received: ${JSON.stringify(answers)}`);
          // Send posted answers.
          listenPostAnswer(function (answer) {
            conn.send(answer.results);
          });
          // Send cache results.
          fetchCacheResults(exam.id).then((cache) => {
            conn.send(cache.data.results);
          });
        })
        .catch((e) => self.alert(`与服务器通信时发生错误：${e}`));
    }
  });
});
