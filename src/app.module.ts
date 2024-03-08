import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
// import { ArtistModule } from './artist/artist.module';
// import { TrackModule } from './track/track.module';
// import { AlbumModule } from './album/album.module';
// import { FavoritesModule } from './favorites/favorites.module';
import { UserModule } from './apiResources/user/user.module';
import { ArtistModule } from './apiResources/artist/artist.module';
import { TrackModule } from './apiResources/track/track.module';
import { AlbumModule } from './apiResources/album/album.module';
import { FavoritesModule } from './apiResources/favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
