import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PublisherDocument = Publisher & Document;

@Schema({ timestamps: true })
export class Publisher {
  @Prop({ lowercase: true, required: true, trim: true })
  firstName: string;

  @Prop({ lowercase: true, required: true, trim: true })
  lastName: string;

  @Prop({ lowercase: true, required: true, trim: true, unique: true })
  companyEmail: string;

  @Prop({ lowercase: true, required: true, trim: true, unique: true })
  companyName: string;

  @Prop({ lowercase: true, required: true, trim: true })
  companyPhone: string;

  @Prop({ lowercase: true, required: true, trim: true })
  jobTitle: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  publisherUuid: string;

  @Prop({ default: '' })
  refreshTokenHash: string;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
