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

async function main() {
  const exam = await getPaper();

  async function login() {
    const username = await USERNAME_OPT.getOrSet();
    const serverAddr = await SERVER_ADDR_OPT.getOrSet();
    const wsAddr = `ws://${serverAddr}/login?username=${username}&exam_id=${exam.id}`;
    console.log(`Login: ${wsAddr}`);
    // Connected to the server.
    const conn = await Connection.connect(wsAddr);
    // Handle received messages.
    conn.listen((answers) =>
      console.log(`Message received: ${JSON.stringify(answers)}`)
    );
    // Send posted answers.
    listenPostAnswer(function (answer) {
      conn.send(answer.results);
    });
    // Send cache results.
    const cache = await fetchCacheResults(exam.id);
    conn.send(cache.data.results);
  }

  let isLogin = false;
  injectLoginButton(() => {
    if (!isLogin) {
      login().then(() => (isLogin = true));
    }
  });
}

main().catch((e) => self.alert(`发生错误：${e}`));
