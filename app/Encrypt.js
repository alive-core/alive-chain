const crypto = require("crypto");
export default class Encrypt {
  static transaction (from,to,now,units) {
    const hash = crypto.createHash('sha256');
    hash.update( from + to + now + units);
    return hash.digest("hex");
  }
  
  static publicKey (privateKey) {
    const hash = crypto.createHash('sha256');
    hash.update(privateKey);
    return hash.digest("hex");
  }

  static privateKey() {
    return crypto.randomBytes(35).toString('hex');
  }

  static secretTransactionKey (privateKey) {
    secret = privateKey.substr(0,10)
    const hash = crypto.createHash('sha256');
    hash.update(secret);
    return hash.digest("hex");
  }
}
