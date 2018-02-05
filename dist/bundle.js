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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_Server__ = __webpack_require__(1);
// import Localchain from "./app/Localchain";
// import Wallet from "./app/Wallet";


const s = new __WEBPACK_IMPORTED_MODULE_0__app_Server__["a" /* default */]()
s.create();
s.listen(5000)

// const wallet  = new Wallet().create();
// new Localchain().generateHashedTransaction()
// new Localchain().readLine()

// console.log(wallet);
// console.log(new Wallet().createPublicKey(privateKey));



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Localchain__ = __webpack_require__(2);

const net = __webpack_require__(8);

class Server {
  create(){
    this.clients = [];
    this.server =  net.createServer( (socket) => {
      this.socket = socket;
      // Identify this client
      socket.name = socket.remoteAddress + ":" + socket.remotePort 
      //clients.push(socket);
      socket.write(socket.name + " connected\n", socket);
    
      // Handle incoming messages from clients.
      
      socket.on('data', this.onData.bind(this));
    
    })
  }

  onData(data) {
    //this.socket.write(data);
    const localchain = new __WEBPACK_IMPORTED_MODULE_0__Localchain__["a" /* default */]();
    //console.log(localchain);
    //console.log(this.receiveData(data));
    localchain.receiveTransaction(this.receiveData(data));
    //this.sendData(data)
    
  }

  listen(port) {
    this.server.listen(port)
  }

  sendData(data){
    console.log(data.toString())
    //this.socket.write(data.toString());
  }

  receiveData(data){
    return JSON.parse(data.toString());
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Server;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Encrypt__ = __webpack_require__(6);
const config = __webpack_require__(3);
const fs = __webpack_require__(4);
const readline = __webpack_require__(5);



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
  
  verifGenesis(){
    let genesis = this.constructGenesis();
    this.writeNewTransaction(genesis);
  }
  
  receiveTransaction(receiveTransaction){
    this.writeNewTransaction(receiveTransaction);
  }

  sendTransaction(sendTransaction){
  }

  generateHashedTransaction(){
    return this.constructGenesis();
  }

  writeNewTransaction(transactionObj){
    fs.stat(config.pathLocalChain, (err, stat)=> {
      if(err == null) {
        fs.createWriteStream(config.pathLocalChain,{flags:'a'})
        .write(JSON.stringify(transactionObj) + "\n")
      } else if(err.code == 'ENOENT') {
        // file does not exist
        fs.createWriteStream(config.pathLocalChain)
        .write(JSON.stringify(transactionObj) + "\n")
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Localchain;



/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {"totalSupply":50000000,"name":"AliveChain","digitsAfterDecimalPoint":8,"pathLocalChain":"./localchain.ndjson"}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const crypto = __webpack_require__(7);
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
/* 7 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ })
/******/ ]);