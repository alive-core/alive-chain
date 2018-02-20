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
 5// import Localchain from "./app/Localchain";
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
const net = __webpack_require__(2);

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
      //socket.on('message', (test)=>{console.log(test)});
    
    })
  }

  onData(data) {
    //this.socket.write(data);
    console.log(this.receiveData(data));
    //this.sendData(data)
    
  }

  listen(port) {
    this.server.listen(port)
  }

  sendData(data){
    //console.log(data.toString())
    this.socket.write(data.toString());
  }

  receiveData(data){
    return data.toString();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Server;



/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ })
/******/ ]);