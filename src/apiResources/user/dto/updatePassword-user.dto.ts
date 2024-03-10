import { IsEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsEmpty()
  @IsString()
  oldPassword: string;

  @IsEmpty()
  @IsString()
  newPassword: string;
}
