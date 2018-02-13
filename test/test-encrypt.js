let expect = require("chai").expect;
import Encrypt from "../app/Encrypt";

describe("Encrypt",()=>{
  describe("#privateKey",()=>{
    it("PrivateKey must have 70 chars", ()=>{
      expect(Encrypt.privateKey().length).to.equal(70);
    })
  })

  describe("#publicKey",()=>{
    it("PrivateKey must have 67 chars", ()=>{
      expect(Encrypt.publicKey(Encrypt.privateKey()).length).to.equal(67);
    })
  })
})
