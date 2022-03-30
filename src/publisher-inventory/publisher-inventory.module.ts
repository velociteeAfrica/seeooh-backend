import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherInventoryService } from './publisher-inventory.service';
import { PublisherInventory, PublisherInventorySchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: PublisherInventory.name, schema: PublisherInventorySchema }],
      'publishers',
    ),
  ],
  providers: [PublisherInventoryService],
  exports: [PublisherInventoryService],
})
export class PublisherInventoryModule {}
