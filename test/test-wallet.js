let expect = require("chai").expect;
import Wallet from "../app/Wallet"

describe("Wallet",()=>{
  describe("#createPrivateKey",()=>{
    it("PrivateKey must have 120 chars", ()=>{
      let wallet = new Wallet;
      expect(wallet.createPrivateKey().length).to.equal(120);
    })
  })
  describe("#createPublicKey",()=>{
    it("Public Key must have 128 chars", ()=>{
      let wallet = new Wallet;
      expect(wallet.createPublicKey(wallet.createPrivateKey()).length).to.equal(128);
    })
  })
})
