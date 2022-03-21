import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusModule } from './status/status.module';
import { PublisherModule } from './publisher/publisher.module';
import { AppLoggerModule } from './logger/logger.module';
import { HttpLoggerMiddleware } from './common/middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AppLoggerModule,
    MongooseModule.forRoot(new ConfigService().get('DATABASE_URI_PUBLISHER'), {
      connectionName: 'publishers',
    }),
    StatusModule,
    PublisherModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
