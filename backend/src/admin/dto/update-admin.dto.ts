import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UpdateAdminDto {
  @IsNotEmpty()
  password: string;
}
