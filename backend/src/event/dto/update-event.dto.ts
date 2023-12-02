import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto {
  title?: string;

  description?: string;

  when?: string;

  address?: string;

  image?: string;
}
