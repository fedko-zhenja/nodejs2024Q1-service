import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
// import { DatabaseService } from 'src/database/database.service';
// import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    // const idValue = uuidv4();

    // const newDataAlbum = {
    //   id: idValue,
    //   ...createAlbumDto,
    // };

    // this.databaseSevice.album.createData(idValue, newDataAlbum);

    const newDataAlbum = await this.prisma.album.create({
      data: createAlbumDto,
    });

    return newDataAlbum;
  }

  async findAll() {
    // const albums = this.databaseSevice.album.getAllData();

    const albums = await this.prisma.album.findMany();

    return albums;
  }

  async findOne(id: string) {
    // const album = this.databaseSevice.album.getDataById(id);

    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    // const album = this.databaseSevice.album.updateData(id);

    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    // album.name = updateAlbumDto.name;
    // album.year = updateAlbumDto.year;
    // album.artistId = updateAlbumDto.artistId;

    const updateAlbum = await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });

    return updateAlbum;
  }

  async remove(id: string) {
    // const res = this.databaseSevice.album.deleteData(id);

    // if (!res) {
    //   throw new NotFoundException(`Album with id ${id} not found`);
    // }

    // const tracks = this.databaseSevice.track.getAllData();

    // tracks.forEach((track) => {
    //   if (track.albumId === id) {
    //     track.albumId = null;
    //   }
    // });

    // const favoriteAlbum = this.databaseSevice.favorites.albums;

    // if (favoriteAlbum.includes(id)) {
    //   const albumIndex = favoriteAlbum.indexOf(id);

    //   favoriteAlbum.splice(albumIndex, 1);
    // }

    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Album with id ${id} not found`);
      }
    }
  }
}
