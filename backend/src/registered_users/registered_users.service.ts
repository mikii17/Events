import { Injectable } from '@nestjs/common';
import { CreateRegisteredUserDto } from './dto/create-registered_user.dto';

@Injectable()
export class RegisteredUsersService {
  create(createRegisteredUserDto: CreateRegisteredUserDto) {
    return 'This action adds a new registeredUser';
  }

  findAll() {
    return `This action returns all registeredUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registeredUser`;
  }

  // update(id: number, updateRegisteredUserDto: UpdateRegisteredUserDto) {
  //   return `This action updates a #${id} registeredUser`;
  // }

  remove(id: number) {
    return `This action removes a #${id} registeredUser`;
  }
}
