export default {
  /**
   * @param {string} key
   * @returns {Promise<any>}
   */
  async getValue(key) {
    return await GM.getValue(key);
  },

  /**
   * @param {string} key
   * @param {any} val
   * @returns {Promise<void>}
   */
  async setValue(key, val) {
    return await GM.setValue(key, val);
  },
};
