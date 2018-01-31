import Encrypt from "./Encrypt";

export default class Transaction {
  /**
   * @param {string} fromPrivateKey Sender Private Key
   * @param {string} toPublicKey Receiver Public Key 
   */
  create(fromPrivateKey,toPublicKey,units) {
    const now = Date.now()
    const fromPublicKey = Encrypt.publicKey(fromPrivateKey);
    const transactionHash = Encrypt.transaction(fromPublicKey,toPublicKey,now,units);
    const transactionObj = buildTransaction(fromProductKey ,toPublicKey, now, transactionHash,units);
    return transactionObj;
  }

  /**
   * @param {string} fromProductKey Sender Public Key
   * @param {string} toPublicKey Receiver Public Key 
   * @param {string} now Transaction date
   * @param {string} hash Transaction Hash
   * @param {string} units Transaction unit
   */
  buildTransaction(fromProductKey,toPublicKey,now,hash,units) {
    let transactionObj = {}; 
    return transactionObj[hash] =  {
      from : fromProductKey,
      to : toPublicKey,
      timestamp : now,
      hash : hash,
      units: units
    }
  }
}
