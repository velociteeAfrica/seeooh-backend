import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PendingPublisherService } from './pending-publisher.service';
import { PendingPublisher, PendingPublisherSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: PendingPublisher.name, schema: PendingPublisherSchema }],
      'publishers',
    ),
    JwtModule.register({}),
  ],
  providers: [PendingPublisherService],
  exports: [PendingPublisherService],
})
export class PendingPublisherModule {}
