import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import type { Album } from './album.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Albums' })
  album: Album;

  @Prop({ required: true })
  title: string;

  @Prop()
  duration: string;
}

export const TracksSchema = SchemaFactory.createForClass(Track);
