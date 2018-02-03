const crypto = require("crypto");
import Encrypt from "./Encrypt";
export default class Wallet {

  // getPublicInfo(publicKey) {
  // }

  // getPrivateInfo(privateKey) {
  // }

  createPrivateKey() {
    return Encrypt.privateKey();
  }
  
  createPublicKey(privateKey) {
    return Encrypt.publicKey(privateKey);
  }

  createSecretTransactionKey(privateKey) {
    return Encrypt.secretTransactionKey(privateKey);
  }

  createPublicSignature(privateKey) {
    return Encrypt.publicSignature(privateKey);
  }

  create(){
    let privateKey = this.createPrivateKey();
    let publicKey = this.createPublicKey(privateKey);
    let secretKey = this.createSecretTransactionKey(privateKey);
    let publicSignature = this.createPublicSignature(privateKey);
    
    return {
      privateKey : privateKey,
      publicKey : publicKey,
      secretKey : secretKey,
      publicSignature : publicSignature,

    }
  }
}
