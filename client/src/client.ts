import { AnswerContext, UserAnswer } from "./types";
import { JSONRPCClient } from "json-rpc-2.0";
import { devLog } from "./utils";
import { SERVER, USERNAME, EXAM_ID, SYNC_ANSWERS } from "./shared";

type AnswerAndContext = {
  result?: any;
  context?: AnswerContext;
};

class Client {
  private token?: string;
  private client?: JSONRPCClient;
  private queue: Map<number, AnswerAndContext> = new Map();
  private onmsg: ((msg: UserAnswer[]) => void)[] = [];

  onmessage(cb: (msg: UserAnswer[]) => void) {
    this.onmsg.push(cb);
  }

  private updateQueue(id: number, f: (v: AnswerAndContext) => void) {
    let val = this.queue.get(id);
    if (val !== undefined) {
      f(val);
    } else {
      val = {};
      f(val);
      this.queue.set(id, val);
    }
  }

  updateAnswer(id: number, result: any) {
    this.updateQueue(id, (v) => (v.result = result));
  }

  updateState(id: number, state: number) {
    this.updateQueue(id, (v) => {
      v.context = v.context ?? {};
      v.context.state = state;
    });
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
      SERVER.value === undefined ||
      USERNAME.value === undefined ||
      EXAM_ID.value === undefined ||
      SYNC_ANSWERS.value !== true
    ) {
      return;
    }
    // Clear queue, we do this first to avoid a queue be sent multi times.
    let answers = [...this.queue.entries()];
    this.queue.clear();
    // Create a new JSON RPC client.
    if (this.client === undefined) {
      const server = SERVER.value;
      const client = new JSONRPCClient((req) => {
        return new Promise<void>((ok, err) => {
          GM.xmlHttpRequest({
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
      this.client = client;
    }
    // Login to server.
    if (this.token === undefined) {
      devLog(`login to server: ${USERNAME.value}, ${EXAM_ID.value}`);
      const token: string = await this.client.request("login", [
        USERNAME.value,
        EXAM_ID.value,
      ]);
      devLog("got token", token);
      this.token = token;
    }
    // Send answers.
    devLog("send answers", answers);
    const rcev: UserAnswer[] = await this.client.request("answer_problem", [
      this.token,
      answers.map(([id, { result: answer, context }]) => ({
        problem_id: id,
        result: answer,
        context: context,
      })),
    ]);
    devLog("receive answers", rcev);
    this.onmsg.forEach((cb) => cb(rcev));
  }
}

export const CLIENT = new Client();
