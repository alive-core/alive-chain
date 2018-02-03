import Localchain from "./app/Localchain";
import Wallet from "./app/Wallet";

const wallet  = new Wallet().create();
//new Localchain().generateHashedTransaction()
//new Localchain().readLine()

console.log(wallet);
//console.log(new Wallet().createPublicKey(privateKey));

