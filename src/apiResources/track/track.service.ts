import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private readonly databaseSevice: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    const idValue = uuidv4();

    const newDataUser = {
      id: idValue,
      ...createTrackDto,
    };

    this.databaseSevice.track.createData(idValue, newDataUser);

    return newDataUser;
  }

  findAll() {
    const tracks = this.databaseSevice.user.getAllData();
    return tracks;
  }

  findOne(id: number) {
    return `This action returns a #${id} track`;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
