// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface User {
  email: string;
  name: string;
}

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserRegistration(name: string, email: string, id: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Thank you for registering',
      template: './registration', // `.ejs` extension is appended automatically
      context: {
        name,
        id,
      },
    });
  }

  async sendUserPassword(password: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password for your account',
      template: './password', // `.ejs` extension is appended automatically
      context: {
        password,
      },
    });
  }
}
