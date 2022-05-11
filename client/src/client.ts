import { Answer, UserAnswer } from "./types";
import { JSONRPCClient } from "json-rpc-2.0";
import GM from "./gm";
import { devLog } from "./utils";
import { SERVER, USERNAME, TOKEN, EXAM_ID, SYNC_ANSWERS } from "./config";

export class Client {
  // Use http request, since we can use non-secure connections
  // via GM.xmlhttprequest.
  private client: JSONRPCClient;
  private onmsg: ((msg: UserAnswer[]) => void)[] = [];
  private queue: Map<number, Answer> = new Map();

  constructor() {
    const client = new JSONRPCClient(async (req) => {
      const url = SERVER.value;
      if (url !== null) {
        await new Promise<void>(async (ok, err) => {
          await GM.xhr({
            url: url,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(req),
            onload: (resp) => {
              if (resp.status === 200) {
                client.receive(JSON.parse(resp.responseText!));
                ok();
              } else {
                err(new Error(resp.statusText));
              }
            },
            onerror: (resp) => err(resp.statusText),
          });
        });
      }
    });
    this.client = client;
  }

  async watch(ms: number): Promise<void> {
    return new Promise((_, err) => {
      const timer = setInterval(() => {
        this.sendQueue().catch((e) => {
          clearInterval(timer);
          alert("与服务器通信异常");
          err(e);
        });
      }, ms);
    });
  }

  private async sendQueue() {
    if (
      this.queue.size < 1 ||
      USERNAME.value === null ||
      SERVER.value === null ||
      EXAM_ID.value === null ||
      SYNC_ANSWERS.value === false
    ) {
      return;
    }
    let answers = [...this.queue.values()];
    this.queue.clear();
    if (TOKEN.value === null) {
      devLog(`login to server: ${USERNAME.value}, ${EXAM_ID.value}`);
      const token: string = await this.client.request("login", [
        USERNAME.value,
        EXAM_ID.value,
      ]);
      devLog("got token", token);
      TOKEN.value = token;
    }
    this.postAnswers(TOKEN.value, answers);
  }

  private async postAnswers(token: string, answers: Answer[]) {
    devLog("send answers", answers);
    const rcev = await this.client.request("answer_problem", [token, answers]);
    devLog("receive answers", rcev);
    this.onmsg.forEach((cb) => cb(rcev));
  }

  async answerProblem(answers: Answer[]) {
    answers.forEach((ans) => {
      this.queue.set(ans.problem_id, ans);
    });
  }

  onmessage(cb: (msg: UserAnswer[]) => void) {
    this.onmsg.push(cb);
  }
}
