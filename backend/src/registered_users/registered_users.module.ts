import { Module } from '@nestjs/common';
import { RegisteredUsersService } from './registered_users.service';
import { RegisteredUsersController } from './registered_users.controller';

@Module({
  controllers: [RegisteredUsersController],
  providers: [RegisteredUsersService]
})
export class RegisteredUsersModule {}
