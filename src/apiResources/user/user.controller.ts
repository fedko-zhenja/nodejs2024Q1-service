import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  // Put,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { UpdatePasswordDto } from './dto/updatePassword-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   console.log('all users');
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   console.log(id, 'id');
  //   return this.userService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePasswordDto: UpdatePasswordDto,
  // ) {
  //   return this.userService.update(id, updatePasswordDto);
  //   // return this.userService.update(+id, updatePasswordDto);
  // }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
