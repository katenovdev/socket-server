import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway(1900, { cors: true })
export class SocketService {
  constructor() {}

  @WebSocketServer()
  server: Server;

  public async emit(event: string, payload: any) {
    return this.server.emit(event, payload);
  }
}
