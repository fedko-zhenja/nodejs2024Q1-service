import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
// import { DatabaseService } from 'src/database/database.service';
// import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    // const idValue = uuidv4();

    // const newDataArtist = {
    //   id: idValue,
    //   ...createArtistDto,
    // };

    // this.databaseSevice.artist.createData(idValue, newDataArtist);

    const newDataArtist = await this.prisma.artist.create({
      data: createArtistDto,
    });

    return newDataArtist;
  }

  async findAll() {
    // const artists = this.databaseSevice.artist.getAllData();
    const artists = await this.prisma.artist.findMany();

    return artists;
  }

  async findOne(id: string) {
    // const atrist = this.databaseSevice.artist.getDataById(id);
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException(`Atrist with id ${id} not found`);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    // const artist = this.databaseSevice.artist.updateData(id);

    // if (!artist) {
    //   throw new NotFoundException(`Artist with id ${id} not found`);
    // }

    // if (updateArtistDto.name) {
    //   artist.name = updateArtistDto.name;
    // }

    // artist.grammy = updateArtistDto.grammy;

    // return artist;

    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const updateArtist = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });

    return updateArtist;
  }

  async remove(id: string) {
    // const res = this.databaseSevice.artist.deleteData(id);
    // if (!res) {
    //   throw new NotFoundException(`Atrist with id ${id} not found`);
    // }
    // const allTracks = this.databaseSevice.track.getAllData();
    // allTracks.forEach((track) => {
    //   if (track.artistId === id) {
    //     track.artistId = null;
    //   }
    // });
    // const allAlbums = this.databaseSevice.album.getAllData();
    // allAlbums.forEach((album) => {
    //   if (album.artistId === id) {
    //     album.artistId = null;
    //   }
    // });
    // const favoriteArtists = this.databaseSevice.favorites.artists;
    // if (favoriteArtists.includes(id)) {
    //   const artistIndex = favoriteArtists.indexOf(id);
    //   favoriteArtists.splice(artistIndex, 1);
    // }

    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Atrist with id ${id} not found`);
      }
    }
  }
}
