import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop()
  description: string;
}

export const ArtistsSchema = SchemaFactory.createForClass(Artist);