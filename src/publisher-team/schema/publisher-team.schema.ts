import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Publisher } from '../../publisher/schema';

export type PublisherTeamDocument = PublisherTeam &
  mongoose.Document & { updatedAt: Date; createdAt: Date };

@Schema({ timestamps: true })
export class PublisherTeam {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Publisher.name })
  publisher: Publisher;

  @Prop({ default: 0, min: 0, max: 2 })
  department: number;

  @Prop({ lowercase: true, required: true, trim: true, unique: true })
  email: string;

  @Prop({ lowercase: true, required: true, trim: true })
  fullName: string;

  @Prop({ lowercase: true, required: true, trim: true })
  position: string;

  @Prop({ lowercase: true, required: true, trim: true })
  phoneNumber: string;

  @Prop({ default: '' })
  profilePicture: string;
}

export const PublisherTeamSchema = SchemaFactory.createForClass(PublisherTeam);
