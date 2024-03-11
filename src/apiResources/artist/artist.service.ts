import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseSevice: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    const idValue = uuidv4();

    const newDataArtist = {
      id: idValue,
      ...createArtistDto,
    };

    this.databaseSevice.artist.createData(idValue, newDataArtist);

    return newDataArtist;
  }

  findAll() {
    const artists = this.databaseSevice.artist.getAllData();

    return artists;
  }

  findOne(id: string) {
    const atrist = this.databaseSevice.artist.getDataById(id);

    if (!atrist) {
      throw new NotFoundException(`Atrist with id ${id} not found`);
    }

    return atrist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.databaseSevice.artist.updateData(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    if (updateArtistDto.name) {
      artist.name = updateArtistDto.name;
    }

    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  remove(id: string) {
    const res = this.databaseSevice.artist.deleteData(id);

    if (!res) {
      throw new NotFoundException(`Atrist with id ${id} not found`);
    }

    const allTracks = this.databaseSevice.track.getAllData();

    allTracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    const allAlbums = this.databaseSevice.album.getAllData();

    allAlbums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }
}
