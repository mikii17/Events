import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsDate()
    @IsNotEmpty()
    when: Date;

    @IsNotEmpty()
    address: string;

    image: string;
}
