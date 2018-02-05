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
  
  getPublicKey(privateKey) {
    return Encrypt.publicKey(privateKey);
  }

  getSecretTransactionKey(privateKey) {
    return Encrypt.secretTransactionKey(privateKey);
  }

  getPublicSignature(privateKey) {
    return Encrypt.publicSignature(privateKey);
  }

  create(){
    let privateKey = this.createPrivateKey();
    let publicKey = this.getPublicKey(privateKey);
    let secretKey = this.getSecretTransactionKey(privateKey);
    let publicSignature = this.getPublicSignature(privateKey);
    
    return {
      privateKey : privateKey,
      publicKey : publicKey,
      secretKey : secretKey,
      publicSignature : publicSignature,

    }
  }

  sendTransaction(transactionObj){
    return {...transactionObj,type:"sended"}
  }
}
