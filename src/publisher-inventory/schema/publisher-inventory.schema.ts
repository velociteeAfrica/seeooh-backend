import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Publisher } from '../../publisher/schema';

export type PublisherInventoryDocument = PublisherInventory &
  mongoose.Document & { updatedAt: Date; createdAt: Date };

@Schema({ timestamps: true })
export class PublisherInventory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Publisher.name })
  publisher: Publisher;

  @Prop({ lowercase: true, required: true, trim: true })
  inventoryName: string;

  @Prop({
    enum: [
      'billboard',
      'construction advert',
      'lamp post',
      'street furniture',
      'transit advert',
    ],
    lowercase: true,
    required: true,
    trim: true,
  })
  inventoryCategory: string;

  // @Prop({
  //   enum: ['digital', 'static'],
  //   lowercase: true,
  //   required: true,
  //   trim: true,
  // })
  // inventoryClass: string;

  @Prop({ lowercase: true, required: true, trim: true })
  inventoryType: string;

  @Prop({ required: true })
  inventoryHeightPixel: number;

  @Prop({ default: 0 })
  inventoryHeightMetre: number;

  @Prop({ required: true })
  inventoryWidthPixel: number;

  @Prop({ default: 0 })
  inventoryWidthMetre: number;

  @Prop({ lowercase: true, required: true, trim: true })
  inventoryLocation: string;

  @Prop({
    enum: ['active', 'inactive', 'vacant'],
    lowercase: true,
    required: true,
    trim: true,
  })
  inventoryStatus: string;

  @Prop({
    enum: [
      'north central',
      'north east',
      'north west',
      'south east',
      'south south',
      'south west',
    ],
    lowercase: true,
    required: true,
    trim: true,
  })
  inventoryRegion: string;

  @Prop({ lowercase: true, required: true, trim: true })
  inventoryState: string;

  @Prop({ required: true, trim: true })
  inventoryLga: string;

  // @Prop({ required: true, trim: true })
  // inventoryCity: string;

  // @Prop({ required: true, trim: true })
  // inventoryCoordinate: string;

  @Prop({ required: true })
  inventoryAmountAnnum: number;

  @Prop({ required: true })
  inventorySlot: number;

  @Prop({ required: true })
  inventoryFace: number;

  @Prop({ required: true })
  inventoryUnit: number;

  @Prop({ default: '' })
  inventoryImage: string;

  @Prop({ required: true })
  inventoryUuid: string;
}

export const PublisherInventorySchema =
  SchemaFactory.createForClass(PublisherInventory);
