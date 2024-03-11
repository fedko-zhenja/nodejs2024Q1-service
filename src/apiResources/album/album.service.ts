import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseSevice: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const idValue = uuidv4();

    const newDataAlbum = {
      id: idValue,
      ...createAlbumDto,
    };

    this.databaseSevice.album.createData(idValue, newDataAlbum);

    return newDataAlbum;
  }

  findAll() {
    const albums = this.databaseSevice.album.getAllData();

    return albums;
  }

  findOne(id: string) {
    const album = this.databaseSevice.album.getDataById(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.databaseSevice.album.updateData(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return album;
  }

  remove(id: string) {
    const res = this.databaseSevice.album.deleteData(id);

    if (!res) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    const tracks = this.databaseSevice.track.getAllData();

    tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }
}
