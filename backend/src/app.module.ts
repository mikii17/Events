import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { AdminModule } from './admin/admin.module';
import { RegisteredUsersModule } from './registered_users/registered_users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConstants } from './auth/const/auth.const';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import * as express from 'express';
import { join } from 'path';

@Module({
  imports: [
    EventModule,
    AdminModule,
    RegisteredUsersModule,
    AuthModule,
    EmailModule,
    MongooseModule.forRoot('mongodb://localhost/test_project'),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(express.static(join(__dirname, '..', 'images', 'events')))
      .forRoutes('*');
  }
}
