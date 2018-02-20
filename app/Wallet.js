const crypto = require("crypto");
import Encrypt from "./Encrypt";
/** 
 * @class Wallet
*/
export default class Wallet {

  /**
   * @return {string} New Private Key
   */
  createPrivateKey() {
    return Encrypt.privateKey();
  }
  
  /**
   * @param {string} privateKey Public key created with Wallet.createPrivateKey
   * @return {string} public Key from a private Key
   */
  getPublicKey(privateKey) {
    return Encrypt.publicKey(privateKey);
  }

  create(){
    let privateKey = this.createPrivateKey();
    let publicKey = this.getPublicKey(privateKey);
    
    return {
      privateKey : privateKey,
      publicKey : publicKey,
    }
  }
}
