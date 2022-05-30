import { AnswerContext, Problem, Result, UserAnswer } from "./types";
import { JSONRPCClient } from "json-rpc-2.0";
import { devLog, Opt, Pipe } from "./utils";
import { SERVER, USERNAME, SYNC_ANSWERS } from "./shared";

type AnswerAndContext = {
  result?: Result;
  context?: AnswerContext;
};

type PaperData = {
  title: string;
  problems: Problem[];
};

class Client {
  private token?: string;
  private client?: JSONRPCClient;
  private examId?: number;
  private paper?: PaperData;
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

  updateAnswer(id: number, result: Result) {
    this.updateQueue(id, (v) => (v.result = result));
  }

  updateState(id: number, state: number) {
    this.updateQueue(id, (v) => {
      v.context = v.context ?? {};
      v.context.state = state;
    });
  }

  updateMsg(id: number, msg: string) {
    this.updateQueue(id, (v) => {
      v.context = v.context ?? {};
      v.context.msg = msg;
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

  async login(examId: number, paper: PaperData) {
    this.examId = examId;
    this.paper = paper;
  }

  private async sendQueue() {
    const syncAnswers = SYNC_ANSWERS.get();
    const server = SERVER.get();
    const username = USERNAME.get();
    if (
      syncAnswers !== true ||
      this.queue.size < 1 ||
      server === undefined ||
      username === undefined ||
      this.examId === undefined ||
      this.paper === undefined
    ) {
      return;
    }
    // Clear queue, we do this first to avoid a queue be sent multi times.
    const answers = [...this.queue.entries()];
    this.queue.clear();
    // Create a new JSON RPC client.
    if (this.client === undefined) {
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
                client.receive(
                  Pipe.from(resp.responseText)
                    .then(Opt.expect("empty response"))
                    .then(JSON.parse)
                    .unwrap()
                );
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
      devLog(`login to server: ${username}, ${this.examId}`);
      const token: string = await this.client.request("login", [
        username,
        this.examId,
        this.paper,
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
