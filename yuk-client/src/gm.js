/**
 * @param {string} name
 * @returns {Promise<string | null>}
 */
export async function getValue(name) {
  return await GM.getValue(name, null);
}

/**
 * @param {string} name
 * @param {string} val
 * @returns {Promise<void>}
 */
export async function setValue(name, val) {
  await GM.setValue(name, val);
}
