import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Publisher, PublisherSchema } from './schema/publisher.schema';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { PublisherInventoryModule } from 'src/publisher-inventory/publisher-inventory.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Publisher.name, schema: PublisherSchema }],
      'publishers',
    ),
    PublisherInventoryModule,
  ],
  controllers: [PublisherController],
  providers: [PublisherService],
  exports: [PublisherService],
})
export class PublisherModule {}
