import { PartialType } from '@nestjs/mapped-types';
import { CreateRegisteredUserDto } from './create-registered_user.dto';

export class UpdateRegisteredUserDto extends PartialType(CreateRegisteredUserDto) {}
