import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private readonly databaseSevice: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    const idValue = uuidv4();

    const newDataTrack = {
      id: idValue,
      ...createTrackDto,
    };

    this.databaseSevice.track.createData(idValue, newDataTrack);

    return newDataTrack;
  }

  findAll() {
    const tracks = this.databaseSevice.track.getAllData();
    return tracks;
  }

  findOne(id: string) {
    const track = this.databaseSevice.track.getDataById(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.databaseSevice.track.updateData(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    if (updateTrackDto.name) {
      track.name = updateTrackDto.name;
    }

    if (updateTrackDto.duration) {
      track.duration = updateTrackDto.duration;
    }

    if (updateTrackDto.albumId) {
      track.albumId = updateTrackDto.albumId;
    }

    if (updateTrackDto.artistId) {
      track.artistId = updateTrackDto.artistId;
    }

    return track;
  }

  remove(id: string) {
    const res = this.databaseSevice.track.deleteData(id);

    if (!res) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    const favoriteTracks = this.databaseSevice.favorites.tracks;

    if (favoriteTracks.includes(id)) {
      const trackIndex = favoriteTracks.indexOf(id);

      favoriteTracks.splice(trackIndex, 1);
    }
  }
}
