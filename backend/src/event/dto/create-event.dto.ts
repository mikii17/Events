import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  when: string;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  address: string;

  image: string;
}
