import styleCss from "./style.module.less?inline";
import { render } from "solid-js/web";

interface Ref<T> {
  value?: T;
}

function assertNonNull<T>(
  value: T,
  message?: string
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw Error(message ?? "value cannot be null");
  }
}

export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

const openedWindows: Ref<Window>[] = [];
window.addEventListener("unload", () =>
  openedWindows.forEach((ref) => {
    ref.value?.close();
  })
);

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
  const ref: Ref<Window> = { value: win };
  openedWindows.push(ref);
  win.addEventListener("close", () => (ref.value = undefined));
  render(
    () => [<title>{opts.title}</title>, <style>{styleCss}</style>],
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
