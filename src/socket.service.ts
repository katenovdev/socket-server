import { WebSocketGateway, WebSocketServer, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(1900, { cors: true })
export class SocketService implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private clientsCount: number = 0;

  afterInit(server: Server) {
    server.on("connection", (socket: Socket) => {
      this.clientsCount++;
      console.log(`Клиент подключен. Текущее количество клиентов: ${this.clientsCount}`);

      socket.on("disconnect", () => {
        this.clientsCount--;
        console.log(`Клиент отключен. Текущее количество клиентов: ${this.clientsCount}`);
      });
    });
  }

  public async emit(event: string, payload: any) {
    return this.server.emit(event, payload);
  }

  public getClientsCount(): number {
    return this.clientsCount;
  }
}
