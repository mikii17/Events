import { Module } from '@nestjs/common';
import { RegisteredUsersService } from './registered_users.service';
import { RegisteredUsersController } from './registered_users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisteredUser, RegisteredUserSchema } from './schema/registered_user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: RegisteredUser.name, schema: RegisteredUserSchema }])],
  controllers: [RegisteredUsersController],
  providers: [RegisteredUsersService]
})
export class RegisteredUsersModule {}
