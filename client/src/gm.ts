import { devLog } from "./utils";

interface XHRResponse {
  status: number;
  statusText: string;
  readyState: number;
  responseHeaders: string;
  repsonse: string | Blob | ArrayBuffer | Document | object | null;
  responseText: string | undefined;
  finalUrl: string;
  context: any;
}

type XHRCallback = (resp: XHRResponse) => void;

interface XHRControl {
  abort(): void;
}

interface XHRDetail {
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
  context?: any;
  anonymous?: boolean;
  onabort?: XHRCallback;
  onerror?: XHRCallback;
  onload?: XHRCallback;
  onloadend?: XHRCallback;
  onloadstart?: XHRCallback;
  onprogress?: XHRCallback;
  onreadystatechange?: XHRCallback;
  ontimeout?: XHRCallback;
}

declare global {
  function GM_getValue(key: string): any;

  function GM_setValue(key: string, val: any): void;

  namespace GM {
    function xmlHttpRequest(details: XHRDetail): XHRControl;
  }
}

export function getValue(key: string): any {
  const val = GM_getValue(key);
  if (val !== undefined) {
    return val.contents;
  }
}

export function setValue(key: string, val: any) {
  GM_setValue(key, { contents: val });
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
