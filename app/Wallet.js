const crypto = require("crypto");
import Encrypt from "./Encrypt";
export default class Wallet {

  createPrivateKey() {
    return Encrypt.privateKey();
  }
  
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
