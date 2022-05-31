export * as Opt from "./utils/Opt";
export * as It from "./utils/It";
export { Lazy } from "./utils/Lazy";
export { Pipe } from "./utils/Pipe";

import styleCss from "./style.module.less?inline";
import { render } from "solid-js/web";
import { Pipe } from "./utils/Pipe";
import * as Opt from "./utils/Opt";

export type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: unknown;
};

export function assertIs<T>(
  ty: { new (): T },
  value: unknown,
  msg?: string
): asserts value is T {
  assert(value instanceof ty, msg ?? "not HTMLElement");
}

export function assert(value: boolean, msg?: string) {
  if (value !== true) {
    throw Error(msg ?? "assertion failed");
  }
}

export function tuple<T extends ReadonlyArray<unknown>>(...t: T): T {
  return t;
}

export function openWin(opts: {
  title: string;
  width: number;
  height: number;
  left?: number;
  top?: number;
}) {
  const win = Pipe.from(
    window.open(
      "",
      "",
      Object.entries(opts)
        .map(([k, v]) => `${k}=${v}`)
        .join(",")
    )
  )
    .then(Opt.from)
    .then(Opt.expect("cannot open windows"))
    .unwrap();
  const close = () => win.close();
  window.addEventListener("unload", close);
  win.addEventListener("close", () =>
    window.removeEventListener("unload", close)
  );
  render(
    () => [
      <title textContent={opts.title} />,
      <style textContent={styleCss} />,
    ],
    win.document.head
  );
  return win;
}

export function devLog(msg?: unknown, ...params: unknown[]) {
  if (__DEV_MODE) {
    console.log(msg, ...params);
  }
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
