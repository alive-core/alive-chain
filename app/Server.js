import Localchain from "./Localchain";
const net = require('net');

export default class Server {
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
    const localchain = new Localchain();
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
