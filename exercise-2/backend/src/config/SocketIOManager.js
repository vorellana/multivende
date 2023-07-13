import { Server } from "socket.io";

class SocketIOManager {
  constructor() {
    this.io = null;
  }

  createServer(httpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });
    this.io.on("connection", (socket) => {
      console.log("Un cliente se ha conectado");
    });
    return this.io;
  }

  getIO() {
    if (!this.io) {
      throw new Error("Debe llamar primero a createServer");
    }
    return this.io;
  }
}

export default new SocketIOManager();
