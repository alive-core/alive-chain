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
}
