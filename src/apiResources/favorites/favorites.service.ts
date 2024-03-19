import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly databaseSevice: DatabaseService) {}

  findAll() {
    const favoritesTracks = this.databaseSevice.favorites.tracks;
    const favoritesArtists = this.databaseSevice.favorites.artists;
    const favoritesAlbums = this.databaseSevice.favorites.albums;

    const resTracks = favoritesTracks.map((track) => {
      return this.databaseSevice.track.getDataById(track);
    });

    const resArtists = favoritesArtists.map((artist) => {
      return this.databaseSevice.artist.getDataById(artist);
    });

    const resAlbums = favoritesAlbums.map((album) => {
      return this.databaseSevice.album.getDataById(album);
    });

    const res = {
      artists: resArtists,
      albums: resAlbums,
      tracks: resTracks,
    };

    return res;
  }

  //---

  createTrack(id: string) {
    const track = this.databaseSevice.track.getDataById(id);

    if (!track) {
      throw new UnprocessableEntityException(`Track with id ${id} not found`);
    }

    const trackCollection = this.databaseSevice.favorites.tracks;

    if (!trackCollection.includes(id)) {
      trackCollection.push(id);
    }
  }

  createArtist(id: string) {
    const artist = this.databaseSevice.artist.getDataById(id);

    if (!artist) {
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);
    }

    const artistCollection = this.databaseSevice.favorites.artists;

    if (!artistCollection.includes(id)) {
      artistCollection.push(id);
    }
  }

  createAlbum(id: string) {
    const album = this.databaseSevice.album.getDataById(id);

    if (!album) {
      throw new UnprocessableEntityException(`Album with id ${id} not found`);
    }

    const albumCollection = this.databaseSevice.favorites.albums;

    if (!albumCollection.includes(id)) {
      albumCollection.push(id);
    }
  }

  //---

  removeTrack(id: string) {
    const trackCollection = this.databaseSevice.favorites.tracks;

    if (trackCollection.includes(id)) {
      const trackIndex = trackCollection.indexOf(id);

      trackCollection.splice(trackIndex, 1);
    } else {
      throw new NotFoundException('Track is not favorite');
    }
  }

  removeArtist(id: string) {
    const artistCollection = this.databaseSevice.favorites.artists;

    if (artistCollection.includes(id)) {
      const artistIndex = artistCollection.indexOf(id);

      artistCollection.splice(artistIndex, 1);
    } else {
      throw new NotFoundException('Artist is not favorite');
    }
  }

  removeAlbum(id: string) {
    const albumCollection = this.databaseSevice.favorites.albums;

    if (albumCollection.includes(id)) {
      const albumIndex = albumCollection.indexOf(id);

      albumCollection.splice(albumIndex, 1);
    } else {
      throw new NotFoundException('Album is not favorite');
    }
  }
}
