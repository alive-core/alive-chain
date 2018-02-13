const crypto = require("crypto");
export default class Encrypt {
  static publicKey (privateKey) {
    const hash = crypto.createHash('sha256');
    hash.update(privateKey);
    return "on-" + hash.digest("hex")
  }

  static privateKey() {
    return crypto.randomBytes(35).toString('hex');
  }
}
