export function listenXhrOnLoad(
  // deno-lint-ignore no-explicit-any
  callback: (this: XMLHttpRequest, data: any) => boolean,
) {
  ((xhrSend) => {
    XMLHttpRequest.prototype.send = function (body) {
      this.addEventListener("load", () => {
        if (callback.call(this, body)) {
          XMLHttpRequest.prototype.send = xhrSend;
        }
      });
      xhrSend.call(this, body);
    };
  })(XMLHttpRequest.prototype.send);
}
