import { devLog, newURL } from "./utils";

type XHRBody = Document | XMLHttpRequestBodyInit | null | undefined;

export function hookXHR(
  cb: (
    this: XMLHttpRequest,
    url: URL
  ) => ((body: XHRBody) => Promise<XHRBody>) | boolean
) {
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (_method, url) {
    const onSend = cb.call(this, newURL(url));
    if (onSend === false) {
      // Dont send request.
      this.send = () => undefined;
    } else if (typeof onSend === "function") {
      // Modify post data.
      const send = this.send;
      this.send = function (data) {
        onSend(data)
          .then((data) => {
            send.call(this, data);
            this.send = send;
          })
          .catch(devLog);
      };
    }
    open.apply(this, arguments as any);
  };
}
