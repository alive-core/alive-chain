/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const crypto = __webpack_require__(1);
class Encrypt {
  static transaction (from,to,now,units) {
    const hash = crypto.createHash('sha256');
    hash.update( from + to + now + units);
    return hash.digest("hex");
  }
  
  static publicKey (privateKey) {
    const hash = crypto.createHash('sha256');
    hash.update(privateKey);
    return "pk-" + hash.digest("hex").substr(0,50);
  }

  static privateKey() {
    return crypto.randomBytes(35).toString('hex');
  }

  static secretTransactionKey (privateKey) {
    let secret = privateKey.substr(0,10)
    const hash = crypto.createHash('sha256');
    hash.update(secret);
    return "st-" + hash.digest("hex").substr(0,40);
  }

  static publicSignature (privateKey) {
    let secret = privateKey.substr(0,15)
    const hash = crypto.createHash('sha256');
    hash.update(secret);
    return "ps-" + hash.digest("hex");
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Encrypt;



/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_Localchain__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_Wallet__ = __webpack_require__(7);



const wallet  = new __WEBPACK_IMPORTED_MODULE_1__app_Wallet__["a" /* default */]().create();
//new Localchain().generateHashedTransaction()
//new Localchain().readLine()

console.log(wallet);
//console.log(new Wallet().createPublicKey(privateKey));



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Encrypt__ = __webpack_require__(0);
const config = __webpack_require__(4);
const fs = __webpack_require__(5);
const readline = __webpack_require__(6);



class Localchain {
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

    transactionObj.hash = __WEBPACK_IMPORTED_MODULE_0__Encrypt__["a" /* default */].transaction(transactionObj.from,
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
/* unused harmony export default */



/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"totalSupply":50000000,"name":"AliveChain","digitsAfterDecimalPoint":8,"pathLocalChain":"./localchain.ndjson"}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Encrypt__ = __webpack_require__(0);
const crypto = __webpack_require__(1);

class Wallet {

  // getPublicInfo(publicKey) {
  // }

  // getPrivateInfo(privateKey) {
  // }

  createPrivateKey() {
    return __WEBPACK_IMPORTED_MODULE_0__Encrypt__["a" /* default */].privateKey();
  }
  
  createPublicKey(privateKey) {
    return __WEBPACK_IMPORTED_MODULE_0__Encrypt__["a" /* default */].publicKey(privateKey);
  }

  createSecretTransactionKey(privateKey) {
    return __WEBPACK_IMPORTED_MODULE_0__Encrypt__["a" /* default */].secretTransactionKey(privateKey);
  }

  createPublicSignature(privateKey) {
    return __WEBPACK_IMPORTED_MODULE_0__Encrypt__["a" /* default */].publicSignature(privateKey);
  }

  create(){
    let privateKey = this.createPrivateKey();
    let publicKey = this.createPublicKey(privateKey);
    let secretKey = this.createSecretTransactionKey(privateKey);
    let publicSignature = this.createPublicSignature(privateKey);
    
    return {
      privateKey : privateKey,
      publicKey : publicKey,
      secretKey : secretKey,
      publicSignature : publicSignature,

    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Wallet;



/***/ })
/******/ ]);