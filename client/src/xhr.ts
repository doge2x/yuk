import { devLog, newURL } from "./utils";

type XHRBody = Document | XMLHttpRequestBodyInit | null | undefined;

export function hookXHR(
  cb: (
    this: XMLHttpRequest,
    url: URL
  ) => ((body: XHRBody) => Promise<XHRBody>) | undefined
) {
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (_, url) {
    const onSend = cb.call(this, newURL(url));
    // Modify post data.
    const send = this.send;
    this.send = function (data) {
      if (onSend !== undefined) {
        onSend(data)
          .then((data) => {
            send.call(this, data);
            this.send = send;
          })
          .catch(devLog);
      } else {
        send.call(this, data);
        this.send = send;
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-rest-params
    open.apply(this, arguments as any);
  };
}
