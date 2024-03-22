import { Injectable } from '@nestjs/common';
import { DatabaseStorage } from 'src/database/DatabaseStorage';
import { User } from 'src/apiResources/user/types/type';
import { Artist } from 'src/apiResources/artist/types/type';
import { Track } from 'src/apiResources/track/types/type';
import { Album } from 'src/apiResources/album/types/type';
import { Favorites } from 'src/apiResources/favorites/types/type';

@Injectable()
export class DatabaseService {
  user = new DatabaseStorage<User>();
  artist = new DatabaseStorage<Artist>();
  track = new DatabaseStorage<Track>();
  album = new DatabaseStorage<Album>();
  favorites: Favorites = {
    artists: [],
    tracks: [],
    albums: [],
  };
}
