import { Controller, OnModuleInit } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { SocketService } from './socket.service';

@Controller()
export class SocketController implements OnModuleInit {
  constructor(private readonly socketService: SocketService) {}

  onModuleInit(): any {
    console.log('INITED KAFKA SOCKET SERVER');
  }

  @MessagePattern('socket-event', Transport.KAFKA)
  socketEvent(@Payload() payload) {
    console.log('Принял', payload);
    // const { event, data } = payload;
    return this.socketService.server.emit(payload.event, payload.data);
  }
}
