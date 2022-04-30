import { MsgSend, MsgReceive } from "./types";
import { newURL } from "./xhr";

export class Client {
  // Use http request, since we can use non-secure connections
  // via GM.xmlhttprequest.
  private ws: WebSocket;

  private constructor(ws: WebSocket) {
    this.ws = ws;
  }

  static async login(
    server: string,
    username: string,
    examId: string
  ): Promise<Client> {
    return new Promise((ok, err) => {
      const ws = new WebSocket(
        newURL(`ws://${server}/login`, {
          username: username,
          exam_id: examId,
        })
      );
      const client = new Client(ws);
      ws.onopen = () => {
        ok(client);
      };
      ws.onerror = err;
      ws.onclose = () => {
        err(new Error("server has been closed"));
      };
    });
  }

  send(msg: MsgSend) {
    this.ws.send(JSON.stringify(msg));
  }

  onmessage(cb: (msg: MsgReceive) => void) {
    this.ws.addEventListener("message", (ev) => cb(JSON.parse(ev.data)));
  }
}
