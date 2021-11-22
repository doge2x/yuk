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

async function login(examId: number): Promise<Connection> {
  const username = await USERNAME_OPT.getOrSet();
  const serverAddr = await SERVER_ADDR_OPT.getOrSet();
  const wsAddr = `ws://${serverAddr}/login?username=${username}&exam_id=${examId}`;
  console.log(`Login: ${wsAddr}`);
  // Connected to the server.
  return await Connection.connect(wsAddr);
}

async function main() {
  const exam = await getPaper();

  let isLogin = false;
  injectLoginButton(() => {
    if (!isLogin) {
      login(exam.id)
        .then((conn) => {
          isLogin = true;
          // Handle received messages.
          conn.listen((answers) =>
            console.log(`Message received: ${JSON.stringify(answers)}`)
          );
          // Send posted answers.
          listenPostAnswer(function (answer) {
            conn.send(answer.results).catch(self.alert);
          });
          // Send cache results.
          fetchCacheResults(exam.id).then((cache) => {
            conn.send(cache.data.results).catch(self.alert);
          });
        })
        .catch((e) => self.alert(`与服务器通讯时发生错误：${e}`));
    }
  });
}

main().catch((e) => self.alert(`发生错误：${e}`));
