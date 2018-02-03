const config = require("../config/Transaction.json");
const fs = require('fs');
const readline = require('readline');

import Encrypt from "./Encrypt";

export default class Localchain {
  constructor() {
    this.totalSupply = config.totalSupply;
  }
  
  constructGenesis(){
    let transactionObj = {
      from : "",
      to : "d048e8e9183be5461f85eccbacf1b6cc4ec52696304c505c1d211aa928c6323330f6431cb6087cfb5da759d50704423735ac5c29ea0fc311077b5cd8a5a6c62d",
      timestamp : "0",
      units: config.totalSupply
    }

    transactionObj.hash = Encrypt.transaction(transactionObj.from,
                        transactionObj.to,
                        transactionObj.timestamp,
                        transactionObj.units);
    return transactionObj;
  }

  receiveTransaction(receiveTransaction){
  }

  sendTransaction(sendTransaction){
  }

  generateHashedTransaction(){
    return this.constructGenesis();
  }

  writeNewTransaction(){
    fs.stat(config.pathLocalChain, (err, stat)=> {
      if(err == null) {
        fs.createWriteStream(config.pathLocalChain,{flags:'a'})
        .write(JSON.stringify(genesis) + "\n")
      } else if(err.code == 'ENOENT') {
        // file does not exist
        fs.createWriteStream(config.pathLocalChain)
        .write(JSON.stringify(genesis))
      } else {
        console.log('Some other error: ', err.code);
      }
    });
  }

  readLines(){
    fs.stat(config.pathLocalChain, (err,stat)=>{
      if(!err) {
        const rl = readline.createInterface({
          input: fs.createReadStream(config.pathLocalChain),
          crlfDelay: Infinity
        });

        rl.on('line', (line) => { 
          console.log(line);
        }); 
      }
    });
  }
}
