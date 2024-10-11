import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import type { Albums } from './albums.schema';

export type TracksDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Albums' })
  album: Albums;

  @Prop({ required: true })
  title: string;

  @Prop()
  duration: string;
}

export const TracksSchema = SchemaFactory.createForClass(Track);