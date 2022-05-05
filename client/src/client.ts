import { Result, UserResult } from "./types";
import { JSONRPCClient } from "json-rpc-2.0";
// import GM from "./gm";

export class Client {
  // Use http request, since we can use non-secure connections
  // via GM.xmlhttprequest.
  private token: string;
  private client: JSONRPCClient;
  private onmsg: ((msg: UserResult[]) => void)[] = [];

  private constructor(token: string, client: JSONRPCClient) {
    this.token = token;
    this.client = client;
  }

  static async login(
    server: string,
    username: string,
    examId: number
  ): Promise<Client> {
    const rpcClient = new JSONRPCClient(async (req) => {
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
            .then((jsonRPCResponse) => rpcClient.receive(jsonRPCResponse));
        } else if (req.id !== undefined) {
          return Promise.reject(new Error(response.statusText));
        }
      });
      // TODO: use GM.xhr
      // return new Promise<void>((ok, err) => {
      //   GM.xhr({
      //     url: server,
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     data: JSON.stringify(req),
      //     onload: (resp) => {
      //       rpcClient.receive(JSON.parse(resp.responseText!));
      //       ok();
      //     },
      //     onerror: err,
      //   }).catch(err);
      // });
    });
    const token = await rpcClient.request("login", [username, examId]);
    return new Client(token, rpcClient);
  }

  async answerProblem(results: Result[]) {
    // TODO: update many
    for (const { problem_id, result } of results) {
      const rcev: UserResult[] = await this.client.request("answer_problem", [
        this.token,
        problem_id,
        result,
      ]);
      this.onmsg.forEach((cb) => cb(rcev));
    }
  }

  onmessage(cb: (msg: UserResult[]) => void) {
    this.onmsg.push(cb);
  }
}
