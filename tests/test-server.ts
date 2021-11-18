function getEnv(name: string, defaultVal?: string): string {
  const env = Deno.env.get(name);
  if (env === undefined) {
    if (defaultVal === undefined) {
      throw new Error(`can't interpret $${name}`);
    }
    return defaultVal;
  }
  return env;
}

const USERNAME = getEnv("YUK_NAME");
const YUK_ADDR = getEnv("YUK_ADDR");
const TOTAL = parseInt(getEnv("YUK_TOTAL", "100")!);
const INTERVAL = parseInt(getEnv("YUK_INTERVAL", "250")!);

class WsMsg {
  examId: string;
  answers: [];

  constructor(examId: string) {
    this.examId = examId;
    this.answers = [];
  }
}

const connections = new Map();

function newWs(id: number): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://${YUK_ADDR}/login?username=${USERNAME}`);
    ws.onmessage = (e) => console.log(e.data);
    ws.onerror = (e) => reject(e);
    ws.onclose = () => console.log(`#${id} closed, ${connections.size} left`);
    ws.onopen = () => resolve(ws);
  });
}

setInterval(() => {
  const id = Math.floor(Math.random() * TOTAL);
  const conn = connections.get(id);
  if (conn === undefined) {
    newWs(id).then((ws) => {
      const msg = new WsMsg("0");
      ws.send(JSON.stringify(msg));
      connections.set(id, ws);
    });
  } else {
    connections.delete(id);
    conn.close();
  }
}, INTERVAL);
