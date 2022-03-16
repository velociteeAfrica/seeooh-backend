import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppStatus } from './entities';

@Injectable()
export class StatusService {
  constructor(private readonly config: ConfigService) {}
  getAppStatus(): AppStatus {
    return {
      status: 'OK',
      message: 'Server is hot',
      environment: this.config.get('NODE_ENV'),
    };
  }
}
