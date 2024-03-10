import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { UpdatePasswordDto } from './dto/updatePassword-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly databaseSevice: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    const idValue = uuidv4();

    const newDataUser = {
      id: idValue,
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.databaseSevice.user.createData(idValue, newDataUser);

    const { password, ...userData } = newDataUser;

    // const serverResponse = {
    //   statusCode: HttpStatus.CREATED,
    //   user: userData,
    // };

    return userData;
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: string) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: string, updatePasswordDto: UpdatePasswordDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
