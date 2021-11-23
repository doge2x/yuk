import { fetchCacheResults, getPaper, listenPostAnswer } from "./xhr";
import { GMOpt } from "./utils";
import { initUI, MainUI } from "./inject";
import { Connection } from "./ws";

const USERNAME_OPT = new GMOpt({
  name: "username",
  show: "用户名",
  hint: "字母、数字、下划线",
  check(val) {
    return val.length > 0 && val.length < 32 && /^[_a-zA-Z]\w+$/.test(val);
  },
});
const SERVER_ADDR_OPT = new GMOpt({
  name: "server_addr",
  show: "服务器地址",
  check(val) {
    return val.length > 0;
  },
});

async function main() {
  const exam = await getPaper();

  async function login(): Promise<Connection> {
    const username = await USERNAME_OPT.getOrSet();
    const serverAddr = await SERVER_ADDR_OPT.getOrSet();
    const wsAddr = `ws://${serverAddr}/login?username=${username}&exam_id=${exam.id}`;
    console.log(`Login: ${wsAddr}`);
    // Connected to the server.
    return await Connection.connect(wsAddr);
  }

  function listenConn(conn: Connection): Promise<void> {
    const ui = new MainUI(exam.paper);
    return new Promise((resolve, reject) => {
      // Handle received messages.
      conn.listen((answers) => ui.updateAnswer(answers));
      // Send posted answers.
      listenPostAnswer(function (answer) {
        conn.send(answer.results).catch(reject);
      });
      // Send cache results.
      fetchCacheResults(exam.id).then((cache) => {
        conn.send(cache.data.results).catch(reject);
      });
      resolve();
    });
  }

  initUI({
    login() {
      let ifLogin = false;
      return this.css("color", "red")
        .text("未登陆")
        .on("click", () => {
          if (!ifLogin) {
            login()
              .then((conn) => {
                ifLogin = true;
                this.text("已登陆").css("color", "green");
                return listenConn(conn);
              })
              .catch((e) => self.alert(`与服务器通讯时发生错误：${e}`));
          }
        });
    },
    username() {
      USERNAME_OPT.get().then((val) => {
        this.text(val || "<未设置>");
      });
      return this.css("text-decoration", "underline").on("click", () => {
        USERNAME_OPT.reset().then((val) => this.text(val));
      });
    },
    server() {
      SERVER_ADDR_OPT.get().then((val) => {
        this.text(val || "<未设置>");
      });
      return this.css("text-decoration", "underline").on("click", () => {
        SERVER_ADDR_OPT.reset().then((val) => this.text(val));
      });
    },
  });
}

main().catch((e) => self.alert(`发生错误：${e}`));
