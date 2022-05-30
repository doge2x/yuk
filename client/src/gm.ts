import { devLog } from "./utils";

interface XHRResponse<T> {
  status: number;
  statusText: string;
  readyState: number;
  responseHeaders: string;
  repsonse: string | Blob | ArrayBuffer | Document | object | null;
  responseText: string | undefined;
  finalUrl: string;
  context: T;
}

type XHRCallback<T> = (resp: XHRResponse<T>) => void;

interface XHRControl {
  abort(): void;
}

interface XHRDetail<T> {
  url: string;
  method?: string;
  user?: string;
  password?: string;
  overrideMimeType?: string;
  headers?: { [k: string]: string };
  responseType?: string;
  timeout?: number;
  data?: string | FormData | Blob;
  binary?: boolean;
  context?: T;
  anonymous?: boolean;
  onabort?: XHRCallback<T>;
  onerror?: XHRCallback<T>;
  onload?: XHRCallback<T>;
  onloadend?: XHRCallback<T>;
  onloadstart?: XHRCallback<T>;
  onprogress?: XHRCallback<T>;
  onreadystatechange?: XHRCallback<T>;
  ontimeout?: XHRCallback<T>;
}

declare global {
  function GM_getValue<T>(key: string): T | undefined;

  function GM_setValue<T>(key: string, val: T | undefined): void;

  const GM: {
    xmlHttpRequest<T = undefined>(details: XHRDetail<T>): XHRControl;
  };
}

export function getValue<T>(key: string): T | undefined {
  const val = GM_getValue<{ contents: T }>(key);
  if (val !== undefined) {
    return val.contents;
  }
  return;
}

export function setValue<T>(key: string, val: T): T {
  GM_setValue(key, { contents: val });
  return val;
}

export function migrate() {
  interface Migration {
    name: string;
    up(): void;
  }

  interface DbMigration {
    name: string;
    idx: number;
  }

  const migrations: Migration[] = [
    {
      name: "202205231915_gm_value",
      up() {
        setValue("no_leave_check", GM_getValue("nol_eavecheck"));
        GM_setValue("nol_eavecheck", undefined);
        for (const k of [
          "username",
          "server",
          "sync_answers",
          "sort_problems",
        ]) {
          setValue(k, GM_getValue(k));
        }
      },
    },
  ];
  const db_migrations: DbMigration[] = getValue("migrations") ?? [];
  for (const { name, idx } of db_migrations) {
    if (!(name === migrations[idx].name)) {
      throw new Error("bad migrations");
    }
  }
  for (const { name, up } of migrations.slice(db_migrations.length)) {
    devLog(`apply migration: ${name}`);
    up();
  }
  setValue(
    "migrations",
    migrations.map((v, i) => ({ name: v.name, idx: i }))
  );
}
