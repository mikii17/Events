import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Admin {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop([String])
  roles: string[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
