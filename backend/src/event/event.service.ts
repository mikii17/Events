import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EventSchema } from './schema/event.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>) {}
  
  async create(createEventDto: CreateEventDto) {
    return await this.eventModel.create(createEventDto);
  }

  async findAll() {
    return await this.eventModel.find();
  }

  async findOne(id: string) {
    return await this.eventModel.findById(id);
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return await this.eventModel.findByIdAndUpdate(id, updateEventDto, {returnOriginal: false});
  }

  async remove(id: string) {
    return await this.eventModel.findByIdAndDelete(id);
  }
}
