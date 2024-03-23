import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
// import { DatabaseService } from 'src/database/database.service';
// import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    // const idValue = uuidv4();

    // const newDataTrack = {
    //   id: idValue,
    //   ...createTrackDto,
    // };

    // this.databaseSevice.track.createData(idValue, newDataTrack);

    const newDataTrack = await this.prisma.track.create({
      data: createTrackDto,
    });

    return newDataTrack;
  }

  async findAll() {
    // const tracks = this.databaseSevice.track.getAllData();
    const tracks = await this.prisma.track.findMany();

    return tracks;
  }

  async findOne(id: string) {
    // const track = this.databaseSevice.track.getDataById(id);

    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    // const track = this.databaseSevice.track.updateData(id);

    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    // if (updateTrackDto.name) {
    //   track.name = updateTrackDto.name;
    // }

    // if (updateTrackDto.duration) {
    //   track.duration = updateTrackDto.duration;
    // }

    // if (updateTrackDto.albumId) {
    //   track.albumId = updateTrackDto.albumId;
    // }

    // if (updateTrackDto.artistId) {
    //   track.artistId = updateTrackDto.artistId;
    // }

    const updateTrack = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });

    return updateTrack;
  }

  async remove(id: string) {
    // const res = this.databaseSevice.track.deleteData(id);

    // if (!res) {
    //   throw new NotFoundException(`Track with id ${id} not found`);
    // }

    // const favoriteTracks = this.databaseSevice.favorites.tracks;

    // if (favoriteTracks.includes(id)) {
    //   const trackIndex = favoriteTracks.indexOf(id);

    //   favoriteTracks.splice(trackIndex, 1);
    // }

    try {
      await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Track with id ${id} not found`);
      }
    }
  }
}
