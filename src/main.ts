import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { EnvConfigService } from './config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: configService.getKafkaClientId(),
        brokers: ['localhost:9092'],
        ssl: false,
        sasl: {
          mechanism: 'plain',
          username: configService.getKafkaUsername(),
          password: configService.getKafkaPassword(),
        },
      },
      producerOnlyMode: true,
      consumer: {
        groupId: 'test-group',
      },
    },
  });

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
