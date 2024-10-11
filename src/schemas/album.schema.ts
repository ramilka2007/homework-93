import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import type { Artists } from './artists.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artists',
  })
  artist: Artists;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  release: number;

  @Prop()
  image: string;
}

export const AlbumsSchema = SchemaFactory.createForClass(Album);