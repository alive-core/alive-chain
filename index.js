import Hashchain from "./app/Hashchain";
import Wallet from "./app/Wallet";

const privateKey  = new Wallet().createPrivateKey();
new Hashchain().generateHashChain()

console.log(privateKey);
console.log(new Wallet().createPublicKey(privateKey));

