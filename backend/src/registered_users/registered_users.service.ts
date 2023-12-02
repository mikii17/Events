import { Injectable } from '@nestjs/common';
import { CreateRegisteredUserDto } from './dto/create-registered_user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RegisteredUser } from './schema/registered_user.schema';
import { Model } from 'mongoose';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class RegisteredUsersService {
  constructor(
    @InjectModel(RegisteredUser.name)
    private readonly registerUserModel: Model<RegisteredUser>,
    private readonly emailService: EmailService,
  ) {}

  async create(createRegisteredUserDto: CreateRegisteredUserDto) {
    const registeredUser = await this.registerUserModel.create(
      createRegisteredUserDto,
    );
    await this.emailService.sendUserRegistration(
      registeredUser.fullName,
      registeredUser.email,
      registeredUser.id,
    );
    return registeredUser;
  }

  async findAll() {
    return await this.registerUserModel.find();
  }

  async findAllByEventId(eventId: string) {
    return await this.registerUserModel.find({ eventId: eventId });
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
