import { Answer, UserAnswer } from "./types";
import { JSONRPCClient } from "json-rpc-2.0";
import GM from "./gm";

export class Client {
  // Use http request, since we can use non-secure connections
  // via GM.xmlhttprequest.
  private client: JSONRPCClient;
  private username: string;
  private examId: number;
  private onmsg: ((msg: UserAnswer[]) => void)[] = [];
  private queue: Map<number, Answer> = new Map();

  private constructor(client: JSONRPCClient, username: string, examId: number) {
    this.client = client;
    this.username = username;
    this.examId = examId;
  }

  static async login(
    server: string,
    username: string,
    examId: number
  ): Promise<Client> {
    const client = new JSONRPCClient(async (req) => {
      await new Promise<void>(async (ok, err) => {
        await GM.xhr({
          url: server,
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
    });
    return new Client(client, username, examId);
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
    if (this.queue.size <= 0) {
      return;
    }
    let answers: UserAnswer[] = [];
    for (const { problem_id, result } of this.queue.values()) {
      answers.push({
        username: this.username,
        problem_id: problem_id,
        result: result,
      });
    }
    this.queue.clear();
    const rcev = await this.client.request("answer_problem", [
      this.examId,
      answers,
    ]);
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
