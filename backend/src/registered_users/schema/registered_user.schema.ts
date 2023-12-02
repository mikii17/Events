import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class RegisteredUser {
    @Prop()
    email: string;

    @Prop()
    fullName: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Event'})
    eventId: Event;

}

export const RegisteredUserSchema = SchemaFactory.createForClass(RegisteredUser);   
