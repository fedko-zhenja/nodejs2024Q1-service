import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  // Put,
  HttpCode,
  // NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { UpdatePasswordDto } from './dto/updatePassword-user.dto';
// import { validate as uuidValidate } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

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
