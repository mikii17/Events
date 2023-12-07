import { IsNotEmpty } from 'class-validator';

export class CreateRegisteredUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  email: string;
}
