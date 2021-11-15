const YUK_ADDR = "ws://127.0.0.1:9009";
const WS_NUM = 100;

function new_ws(id) {
  const ws = new WebSocket(YUK_ADDR);
  ws.onmessage = (e) => console.log(e.data);
  ws.onopen = () => {
    ws.send(`#${id}: hello`);
    console.info(`#${id}: connected`);
  };
  ws.onclose = () => console.info(`#${id}: closed`);
  return ws;
}

const connections = new Map();

setInterval(() => {
  let id = Math.floor(Math.random() * WS_NUM);
  if (connections.has(id)) {
    connections.get(id).close();
    connections.delete(id);
  } else {
    connections.set(id, new_ws(id));
  }
}, 500);
