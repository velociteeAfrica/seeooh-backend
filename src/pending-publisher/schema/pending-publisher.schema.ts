import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { PendingPublisherReturn } from '../entities';

export type PendingPublisherDocument = PendingPublisher & mongoose.Document;

@Schema({ timestamps: true })
export class PendingPublisher {
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

  @Prop()
  activationToken: string;

  toResponseObject: () => PendingPublisherReturn;
}

export const PendingPublisherSchema =
  SchemaFactory.createForClass(PendingPublisher);

PendingPublisherSchema.methods.toResponseObject = function () {
  const {
    _id,
    firstName,
    lastName,
    companyEmail,
    companyName,
    companyPhone,
    jobTitle,
    activationToken,
    createdAt,
  } = this;
  return {
    id: _id,
    firstName,
    lastName,
    companyEmail,
    companyName,
    companyPhone,
    jobTitle,
    activationToken,
    createdAt,
  };
};
