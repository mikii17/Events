import { IsOptional } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  when: string;

  @IsOptional()
  link: string;

  @IsOptional()
  address: string;

  @IsOptional()
  image: string;
}
