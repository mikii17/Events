import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Event {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    when: Date;

    @Prop()
    address: string;

    @Prop()
    image: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);