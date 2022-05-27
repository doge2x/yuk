import styleCss from "./style.module.less?inline";
import { render } from "solid-js/web";

export function assertNonNull<T>(
  value: T,
  msg?: string
): asserts value is NonNullable<T> {
  assert(value !== undefined && value !== null, msg ?? "null value");
}

export type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: any;
};

export function assertIs<T>(
  ty: { new (): T },
  value: any,
  msg?: string
): asserts value is T {
  assert(value instanceof ty, msg ?? "not HTMLElement");
}

export function assert(value: boolean, msg?: string) {
  if (value !== true) {
    throw Error(msg ?? "assertion failed");
  }
}

export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

export function tuple<T extends ReadonlyArray<any>>(...t: T): T {
  return t;
}

export function openWin(opts: {
  title: string;
  width: number;
  height: number;
  left?: number;
  top?: number;
}) {
  const win = window.open(
    "",
    "",
    Object.entries(opts)
      .map(([k, v]) => `${k}=${v}`)
      .join(",")
  );
  assertNonNull(win);
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

export function devLog(msg?: any, ...params: any[]) {
  if (isDevMode()) {
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
