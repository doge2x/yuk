/**
 * @typedef {object} XHRDetail
 * @property {string} url
 * @property {string} [method]
 * @property {string} [user]
 * @property {string} [password]
 * @property {string} [overrideMimeType]
 * @property {{[k:string]:string}} [headers]
 * @property {string} [responseType]
 * @property {number} [timeout]
 * @property {string|FormData|Blob} [data]
 * @property {boolean} [binary]
 * @property {any} [context]
 * @property {boolean} [anonymous]
 * @property {XHRCallback} [onabort]
 * @property {XHRCallback} [onerror]
 * @property {XHRCallback} [onload]
 * @property {XHRCallback} [onloadend]
 * @property {XHRCallback} [onloadstart]
 * @property {XHRCallback} [onprogress]
 * @property {XHRCallback} [onreadystatechange]
 * @property {XHRCallback} [ontimeout]
 */

/**
 * @callback XHRCallback
 * @param {XHRResponse} resp
 * @returns {void}
 */

/**
 * @typedef {object} XHRResponse
 * @property {number} status
 * @property {string} statusText
 * @property {number} readyState
 * @property {string} responseHeaders
 * @property {string|Blob|ArrayBuffer|Document|object|null} response
 * @property {string|undefined} responseText
 * @property {string} finalUrl
 * @property {any} context
 */

/**
 * @typedef {object} XHRControl
 * @property {() => void} abort
 */

export default {
  /**
   * @param {string} key
   * @returns {any}
   */
  getValue(key) {
    return GM_getValue(key);
  },

  /**
   * @param {string} key
   * @param {any} val
   * @returns {void}
   */
  setValue(key, val) {
    return GM_setValue(key, val);
  },

  /**
   * @param {XHRDetail} details
   * @returns {Promise<XHRControl>}
   */
  async xhr(details) {
    return await GM.xmlHttpRequest(details);
  },
};
