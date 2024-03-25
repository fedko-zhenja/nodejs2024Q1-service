import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newDataAlbum = await this.prisma.album.create({
      data: createAlbumDto,
    });

    return newDataAlbum;
  }

  async findAll() {
    const albums = await this.prisma.album.findMany();

    return albums;
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    const updateAlbum = await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });

    return updateAlbum;
  }

  async remove(id: string) {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Album with id ${id} not found`);
      }
    }
  }
}
