import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schema/admin.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private readonly adminModel: Model<Admin>) {}

  async create(createAdminDto: CreateAdminDto) {

    return await this.adminModel.create(createAdminDto);
  }

  async findAll() {
    return await this.adminModel.find();
  }

  async findOneById(id: string) {
    return this.adminModel.findById(id);
  }

  async findOneByEmail(email: string) {
    return await this.adminModel.findOne({email: email});
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    return await this.adminModel.findByIdAndUpdate(id, updateAdminDto); 
  }

  async remove(id: string) {
    return await this.adminModel.findByIdAndDelete(id);
  }
}
