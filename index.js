 5// import Localchain from "./app/Localchain";
// import Wallet from "./app/Wallet";
import Server from "./app/Server";

const s = new Server()
s.create();
s.listen(5000)

// const wallet  = new Wallet().create();
// new Localchain().generateHashedTransaction()
// new Localchain().readLine()

// console.log(wallet);
// console.log(new Wallet().createPublicKey(privateKey));

