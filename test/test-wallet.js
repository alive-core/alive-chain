let expect = require("chai").expect;
import Wallet from "../app/Wallet"

describe("Wallet",()=>{
  describe("#createPrivateKey",()=>{
    it("PrivateKey must have 70 chars", ()=>{
      let wallet = new Wallet;
      expect(wallet.createPrivateKey().length).to.equal(70);
    })
  })
  describe("#createPublicKey",()=>{
    it("Public Key must have 67 chars", ()=>{
      let wallet = new Wallet;
      expect(wallet.getPublicKey(wallet.createPrivateKey()).length).to.equal(67);
    })
  })
  describe("#create",()=>{
    it("Must contain a public Key and a private Key", ()=>{
      let wallet = new Wallet;
      let keys = wallet.create();
      expect(keys).to.have.property('privateKey').with.lengthOf(70);
      expect(keys).to.have.property('publicKey').with.lengthOf(67);
    })
  })
})
