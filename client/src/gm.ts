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
  return GM_getValue(key);
}

export function setValue(key: string, val: any) {
  GM_setValue(key, { contents: val });
}
