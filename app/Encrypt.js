const crypto = require("crypto");
/** 
 * @class Encrypt
*/
export default class Encrypt {
  /**
   * publicKey
   * @static
   * @param {string} privateKey Random Hexadecimal string with a fixed length 
   * @return {string} sha256 privateKey's convertion with a suffix
   */
  static publicKey (privateKey) {
    const hash = crypto.createHash('sha256');
    hash.update(privateKey);
    return "on-" + hash.digest("hex")
  }
  /**
   * publicKey
   * @static
   * @return {string} sha256 privateKey's convertion with a suffix
   */
  static privateKey() {
    return crypto.randomBytes(35).toString('hex');
  }
}
