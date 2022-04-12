import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Publisher, PublisherSchema } from '../publisher/schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategy';
import { PendingPublisherModule } from '../pending-publisher/pending-publisher.module';
import { PublisherModule } from '../publisher/publisher.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppLoggerService } from '../logger/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Publisher.name, schema: PublisherSchema }],
      'publishers',
    ),
    MailerModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
        loggerService: AppLoggerService,
      ) => {
        loggerService.log(
          'MAIL_OUTGOING_SERVER',
          configService.get('MAIL_OUTGOING_SERVER'),
        );
        loggerService.log(
          'MAIL_OUTGOING_PORT',
          configService.get('MAIL_OUTGOING_PORT'),
        );
        loggerService.log(
          'MAIL_INCOMING_USERNAME',
          configService.get('MAIL_INCOMING_USERNAME'),
        );
        loggerService.log(
          'MAIL_INCOMING_PASSWORD',
          configService.get('MAIL_INCOMING_PASSWORD'),
        );
        loggerService.log('process', process.cwd());
        return {
          transport: {
            host: configService.get('MAIL_OUTGOING_SERVER'),
            port: 465,
            secure: false,
            auth: {
              user: configService.get('MAIL_INCOMING_USERNAME'),
              pass: configService.get('MAIL_INCOMING_PASSWORD'),
            },
          },
          defaults: {
            from: 'Seeooh <support@seeooh.app>',
          },
          template: {
            dir: process.cwd() + '/src/templates/',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService, AppLoggerService],
    }),
    JwtModule.register({}),
    PublisherModule,
    PendingPublisherModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
