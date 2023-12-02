import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto {
  title: string;

  description: string;

  when: Date;

  address: string;

  image: string;
}
