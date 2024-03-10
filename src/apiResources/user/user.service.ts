import { Injectable, NotFoundException } from '@nestjs/common';
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

    return userData;
  }

  findAll() {
    const users = this.databaseSevice.user.getAllData();

    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return usersWithoutPassword;
  }

  findOne(id: string) {
    const user = this.databaseSevice.user.getDataById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const { password, ...userData } = user;

    return userData;
  }

  // update(id: string, updatePasswordDto: UpdatePasswordDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
