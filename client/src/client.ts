import { Answer, UserAnswer } from "./types";
import { JSONRPCClient } from "json-rpc-2.0";
import GM from "./gm";
import { devLog } from "./utils";
import { SERVER, USERNAME, TOKEN } from "./config";

export class Client {
  // Use http request, since we can use non-secure connections
  // via GM.xmlhttprequest.
  private client: JSONRPCClient;
  private examId: number;
  private onmsg: ((msg: UserAnswer[]) => void)[] = [];
  private queue: Map<number, Answer> = new Map();

  constructor(examId: number) {
    const client = new JSONRPCClient(async (req) => {
      const url = SERVER.value;
      if (url !== undefined) {
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
    this.examId = examId;
  }

  async watch(ms: number) {
    return new Promise((_, err) => {
      const timer = setInterval(() => {
        this.sendQueue().catch((e) => {
          clearInterval(timer);
          err(e);
        });
      }, ms);
    });
  }

  private async sendQueue() {
    const username = USERNAME.value;
    if (
      this.queue.size < 1 ||
      username === undefined ||
      SERVER.value === undefined
    ) {
      return;
    }
    let answers: UserAnswer[] = [];
    for (const { problem_id, result } of this.queue.values()) {
      answers.push({
        username: username,
        problem_id: problem_id,
        result: result,
      });
    }
    this.queue.clear();
    if (TOKEN.value === undefined) {
      devLog(`login to server: ${username}, ${this.examId}`);
      const token = await this.client.request("login", [
        USERNAME.value,
        this.examId,
      ]);
      devLog("got token", token);
      TOKEN.value = token;
    }
    devLog("send answers", answers);
    const rcev = await this.client.request("answer_problem", [
      TOKEN.value,
      answers,
    ]);
    this.pushMsg(rcev);
  }

  private pushMsg(answers: UserAnswer[]) {
    devLog("receive answers", answers);
    this.onmsg.forEach((cb) => cb(answers));
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
