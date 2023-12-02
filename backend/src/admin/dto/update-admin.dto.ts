import { IsStrongPassword } from 'class-validator';

export class UpdateAdminDto {
  @IsStrongPassword()
  password: string;
}
