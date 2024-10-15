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
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { UniqueUserEmailConstraint } from './users/validators/unique-user-email.validators';
import { IdExistsConstraint } from './global/validators/id-exist.validator';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/spotify'),
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistsSchema },
      { name: Album.name, schema: AlbumsSchema },
      { name: Track.name, schema: TracksSchema },
      { name: User.name, schema: UserSchema },
    ]),
    PassportModule,
  ],
  controllers: [
    AppController,
    ArtistsController,
    AlbumsController,
    TracksController,
    UsersController,
  ],
  providers: [
    AppService,
    AuthService,
    LocalStrategy,
    UniqueUserEmailConstraint,
    IdExistsConstraint,
  ],
})
export class AppModule {}
