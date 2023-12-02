import { Injectable } from '@nestjs/common';
import { CreateRegisteredUserDto } from './dto/create-registered_user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RegisteredUser } from './schema/registered_user.schema';
import { Model } from 'mongoose';

@Injectable()
export class RegisteredUsersService {
  constructor(@InjectModel(RegisteredUser.name) private readonly registerUserModel: Model<RegisteredUser>) {}  

  async create(createRegisteredUserDto: CreateRegisteredUserDto) {
    return await this.registerUserModel.create(createRegisteredUserDto);
  }

  async findAll() {
    return await this.registerUserModel.find();
  }

  async findOne(id: string) {
    return await this.registerUserModel.findById(id);
  }

  // update(id: string, updateRegisteredUserDto: UpdateRegisteredUserDto) {
  //   return `This action updates a #${id} registeredUser`;
  // }

  async remove(id: string) {
    return await this.registerUserModel.findByIdAndDelete(id);
  }
}
