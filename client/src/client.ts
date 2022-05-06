import { Answer, UserAnswer } from "./types";
import { JSONRPCClient } from "json-rpc-2.0";
// import GM from "./gm";

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
      await fetch(server, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(req),
      }).then((response) => {
        if (response.status === 200) {
          // Use client.receive when you received a JSON-RPC response.
          return response
            .json()
            .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
        } else if (req.id !== undefined) {
          return Promise.reject(new Error(response.statusText));
        }
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
