/**
 * @param {string} name
 * @returns {string | null}
 */
export function getValue(name) {
  return GM_getValue(name, null);
}

/**
 * @param {string} name
 * @param {string} val
 */
export function setValue(name, val) {
  GM_setValue(name, val);
}
