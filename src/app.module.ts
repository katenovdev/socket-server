import { Module } from '@nestjs/common';
import { SocketController } from './socket.contoller';
import { SocketService } from './socket.service';
import { EnvConfigModule } from './config/env-config.module';

@Module({
  imports: [EnvConfigModule],
  controllers: [SocketController],
  providers: [SocketService],
})
export class AppModule {}
