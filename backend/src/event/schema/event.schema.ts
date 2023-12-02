import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Event {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  when: string;

  @Prop()
  address: string;

  @Prop()
  image: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
