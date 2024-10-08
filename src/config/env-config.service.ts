import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) {}

  getKafkaClientId(): string {
    return this.configService.get<string>('KAFKA_CLIENT');
  }

  getKafkaUsername(): string {
    return this.configService.get<string>('KAFKA_USERNAME');
  }

  getKafkaPassword(): string {
    return this.configService.get<string>('KAFKA_PASSWORD');
  }
}
