/**
 * @param {function(this: XMLHttpRequest, any): boolean} callback
 */
export function listenXhrOnLoad(callback) {
  ((xhrSend) => {
    XMLHttpRequest.prototype.send = function (body) {
      this.addEventListener("load", () => {
        if (callback.call(this, body)) {
          XMLHttpRequest.prototype.send = xhrSend;
        }
      });
      xhrSend.apply(this, arguments);
    };
  })(XMLHttpRequest.prototype.send);
}
