import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const favsData = await this.prisma.favorite.findFirst();

    if (!favsData) {
      return { artists: [], albums: [], tracks: [] };
    }

    const tracks = await this.prisma.track.findMany({
      where: { id: { in: favsData.tracks } },
    });

    const albums = await this.prisma.album.findMany({
      where: { id: { in: favsData.albums } },
    });

    const artists = await this.prisma.artist.findMany({
      where: { id: { in: favsData.artists } },
    });

    const resData = { tracks, albums, artists };

    return resData;
  }

  //---

  async createTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new UnprocessableEntityException(`Track with id ${id} not found`);
    }

    const favorite = await this.prisma.favorite.findFirst();

    if (!favorite) {
      await this.prisma.favorite.create({
        data: {
          tracks: [track.id],
        },
      });
    } else {
      const isTrackInFavorites = favorite.tracks.includes(track.id);
      if (!isTrackInFavorites) {
        await this.prisma.favorite.update({
          where: { favoriteId: favorite.favoriteId },
          data: { tracks: { set: [...favorite.tracks, track.id] } },
        });
      } else {
        throw new HttpException(
          `Track with id ${id} already exists in favorites`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  async createArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);
    }

    const favorite = await this.prisma.favorite.findFirst();

    if (!favorite) {
      await this.prisma.favorite.create({
        data: {
          artists: [artist.id],
        },
      });
    } else {
      const isArtistInFavorites = favorite.artists.includes(artist.id);
      if (!isArtistInFavorites) {
        await this.prisma.favorite.update({
          where: { favoriteId: favorite.favoriteId },
          data: { artists: { set: [...favorite.artists, artist.id] } },
        });
      } else {
        throw new HttpException(
          `Track with id ${id} already exists in favorites`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  async createAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new UnprocessableEntityException(`Album with id ${id} not found`);
    }

    const favorite = await this.prisma.favorite.findFirst();

    if (!favorite) {
      await this.prisma.favorite.create({
        data: {
          albums: [album.id],
        },
      });
    } else {
      const isAlbumInFavorites = favorite.albums.includes(album.id);
      if (!isAlbumInFavorites) {
        await this.prisma.favorite.update({
          where: { favoriteId: favorite.favoriteId },
          data: { albums: { set: [...favorite.albums, album.id] } },
        });
      } else {
        throw new HttpException(
          `Track with id ${id} already exists in favorites`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  //---

  async removeTrack(id: string) {
    const favorite = await this.prisma.favorite.findFirst();

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    const isTrackInFavorites = favorite.tracks.includes(id);
    if (!isTrackInFavorites) {
      throw new NotFoundException('Track is not favorite');
    }

    await this.prisma.favorite.update({
      where: { favoriteId: favorite.favoriteId },
      data: {
        tracks: { set: favorite.tracks.filter((trackId) => trackId !== id) },
      },
    });
  }

  async removeArtist(id: string) {
    const favorite = await this.prisma.favorite.findFirst();

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    const isArtistInFavorites = favorite.artists.includes(id);
    if (!isArtistInFavorites) {
      throw new NotFoundException('Artist is not favorite');
    }

    await this.prisma.favorite.update({
      where: { favoriteId: favorite.favoriteId },
      data: {
        artists: {
          set: favorite.artists.filter((artistId) => artistId !== id),
        },
      },
    });
  }

  async removeAlbum(id: string) {
    const favorite = await this.prisma.favorite.findFirst();

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    const isAlbumInFavorites = favorite.albums.includes(id);
    if (!isAlbumInFavorites) {
      throw new NotFoundException('Album is not favorite');
    }

    await this.prisma.favorite.update({
      where: { favoriteId: favorite.favoriteId },
      data: {
        albums: {
          set: favorite.albums.filter((albumId) => albumId !== id),
        },
      },
    });
  }
}
