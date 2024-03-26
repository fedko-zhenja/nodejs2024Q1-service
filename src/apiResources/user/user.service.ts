import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/updatePassword-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const newDataUser = await this.prisma.user.create({ data: createUserDto });

    const userData = {
      id: newDataUser.id,
      login: newDataUser.login,
      version: newDataUser.version,
      createdAt: newDataUser.createdAt.getTime(),
      updatedAt: newDataUser.updatedAt.getTime(),
    };

    return userData;
  }

  async findAll() {
    const users = this.prisma.user.findMany();

    const usersWithoutPassword = (await users).map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return usersWithoutPassword;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const { password, ...userData } = user;

    return userData;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updateUser = await this.prisma.user.update({
      where: { id },
      data: {
        version: { increment: 1 },
        password: updatePasswordDto.newPassword,
      },
    });

    const userData = {
      id: updateUser.id,
      login: updateUser.login,
      version: updateUser.version,
      createdAt: updateUser.createdAt.getTime(),
      updatedAt: updateUser.updatedAt.getTime(),
    };

    return userData;
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }
    }
  }
}
