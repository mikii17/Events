import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { AdminModule } from './admin/admin.module';
import { RegisteredUsersModule } from './registered_users/registered_users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    EventModule,
    AdminModule,
    RegisteredUsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/test_project'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
