import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './apiResources/user/user.module';
import { ArtistModule } from './apiResources/artist/artist.module';
import { TrackModule } from './apiResources/track/track.module';
import { AlbumModule } from './apiResources/album/album.module';
import { FavoritesModule } from './apiResources/favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
