const config = require("../config/Transaction.json");
const fs = require('fs');

import Encrypt from "./Encrypt";

export default class Hashchain {
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

  generateHashChain(){
    let genesis = this.constructGenesis();
    fs.stat('./chain.json', function(err, stat) {
      if(err == null) {
          console.log('File exists');
      } else if(err.code == 'ENOENT') {
          // file does not exist
          fs.createWriteStream('./chain.json')
          .write(JSON.stringify(genesis))
      } else {
          console.log('Some other error: ', err.code);
      }
    });
  }
}
