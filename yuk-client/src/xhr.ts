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

export async function hookXHR<T>(
  cb: (this: XMLHttpRequest, url: URL, body: Promise<any>) => Promise<T>
): Promise<T> {
  return new Promise((ok, err) => {
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (_method, url) {
      cb.call(
        this,
        newURL(url),
        new Promise((ok) => {
          const send = this.send;
          this.send = function (data) {
            ok(data);
            send.apply(this, arguments as any);
            this.send = send;
          };
        })
      )
        .then((val) => {
          ok(val);
          XMLHttpRequest.prototype.open = open;
        })
        .catch(err);
      open.apply(this, arguments as any);
    };
  });
}
