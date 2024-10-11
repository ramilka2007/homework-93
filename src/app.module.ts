import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { AlbumsController } from './albums/albums.controller';
import { TracksController } from './tracks/tracks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TracksSchema } from './schemas/track.schema';
import { Album, AlbumsSchema } from './schemas/album.schema';
import { Artist, ArtistsSchema } from './schemas/artist.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/spotify'),
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistsSchema },
      { name: Album.name, schema: AlbumsSchema },
      { name: Track.name, schema: TracksSchema },
    ]),
  ],
  controllers: [AppController, ArtistsController, AlbumsController, TracksController],
  providers: [AppService],
})
export class AppModule {}
