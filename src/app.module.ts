import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusModule } from './status/status.module';
import { PublisherModule } from './publisher/publisher.module';
import { AppLoggerModule } from './logger/logger.module';
import { HttpLoggerMiddleware } from './common/middleware';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guard';
import { PublisherInventoryModule } from './publisher-inventory/publisher-inventory.module';
import { PendingPublisherModule } from './pending-publisher/pending-publisher.module';

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
    AuthModule,
    PublisherInventoryModule,
    PendingPublisherModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
