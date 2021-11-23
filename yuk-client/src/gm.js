/**
 * @param {string} name
 * @returns {Promise<string | undefined>}
 */
export async function getValue(name) {
  return await GM.getValue(name);
}

/**
 * @param {string} name
 * @param {string} val
 * @returns {Promise<void>}
 */
export async function setValue(name, val) {
  await GM.setValue(name, val);
}
