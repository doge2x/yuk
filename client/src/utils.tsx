import styleCss from "./style.mod.css";
import Recks from "./recks";

export function devLog(msg?: any, ...params: any[]) {
  if (DEV_MODE) {
    console.log(msg, ...params);
  }
}

export class Map2<K, V> extends Map<K, V> {
  private def: () => V;

  constructor(def: () => V) {
    super();
    this.def = def;
  }

  setWith(key: K, op: (val: V) => V) {
    super.set(key, op(super.get(key) ?? this.def()));
  }
}

export function percent(n: number): string {
  return `${Math.floor(n * 100)}%`;
}

export function openWin(
  title: string,
  opt?: {
    height?: number;
    width?: number;
    left?: number;
    top?: number;
  }
): Window {
  opt = opt ?? {};
  const win = window.open(
    undefined,
    undefined,
    Object.entries({
      location: "no",
      height: opt.height,
      width: opt.width,
      left: opt.left,
      top: opt.top,
      resizable: "yes",
      menubar: "no",
      scrollbars: "yes",
      status: "no",
      titlebar: "no",
      toolbar: "no",
    })
      .map(([k, v]) => `${k}=${v}`)
      .join(",")
  )!;
  window.addEventListener("unload", () => win.close());
  win.document.head.append(
    <Recks.Fragment>
      <title>{title}</title>
      <style>{styleCss.toString()}</style>
    </Recks.Fragment>
  );
  return win;
}

export function newURL(
  url: string | URL,
  params?: { [s: string]: string }
): URL {
  const url2 = new URL(url, self.location.origin);
  for (const [k, v] of Object.entries(params ?? {})) {
    url2.searchParams.set(k, v);
  }
  return url2;
}
