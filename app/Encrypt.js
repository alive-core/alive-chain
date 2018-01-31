const crypto = require("crypto");
export default class Encrypt {
  static transaction (from,to,now,units) {
    const hash = crypto.createHash('sha512');
    hash.update( from + to + now + units);
    return hash.digest("hex");
  }
  
  static publicKey (privateKey) {
    const hash = crypto.createHash('sha512');
    hash.update(privateKey);
    return hash.digest("hex");
  }

  static privateKey () {
    return crypto.randomBytes(35).toString('hex');
  }
}
