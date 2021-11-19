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

const YUK_ADDR = getEnv("YUK_ADDR");
const TOTAL = parseInt(getEnv("YUK_TOTAL", "20")!);
const INTERVAL = parseInt(getEnv("YUK_INTERVAL", "500")!);

function randomId(): number {
  return Math.floor(Math.random() * TOTAL);
}

const EXAM_ID = randomId();

interface Answer {
  problemId: number;
  // deno-lint-ignore no-explicit-any
  result: any;
}

class WsMsg {
  // deno-lint-ignore no-explicit-any
  inner: Map<number, any> = new Map();

  // deno-lint-ignore no-explicit-any
  update(problemId: number, result: any) {
    this.inner.set(problemId, result);
  }

  toJSON(): Answer[] {
    const answers = [];
    for (const [k, v] of this.inner.entries()) {
      answers.push({
        problemId: k,
        result: v,
      });
    }
    return answers;
  }
}

const connections = new Map();

function randomWsMsg(): WsMsg {
  const msg = new WsMsg();
  for (let i = 0; i < randomId(); i++) {
    msg.update(
      i * randomId(),
      (Math.random() + 1).toString(36).substring(2),
    );
  }
  return msg;
}

function newWs(id: number): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(
      `ws://${YUK_ADDR}/login?username=test_user_${randomId()}&exam_id=${EXAM_ID}`,
    );
    ws.onmessage = (e) => console.log(e.data);
    ws.onerror = (e) => reject(e);
    ws.onclose = () => console.log(`#${id} closed, ${connections.size} left`);
    ws.onopen = () => resolve(ws);
  });
}

setInterval(() => {
  const id = randomId();
  const conn = connections.get(id);
  if (conn === undefined) {
    newWs(id).then((ws) => {
      connections.set(id, ws);
      console.log(`#${id} connected`);
    }).catch(console.log);
  } else {
    if (Math.random() < 0.25) {
      connections.delete(id);
      conn.close();
    } else {
      conn.send(JSON.stringify(randomWsMsg()));
    }
  }
}, INTERVAL);
