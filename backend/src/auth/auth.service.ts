import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/admin/admin.service';
import { Role } from './enums/role.enum';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}
  async signup(createAuthDto: CreateAuthDto) {
    const password = Math.random().toString(36).slice(-8); //TODO: Use strong password generator
    const salt = (await bcrypt.genSalt()) as string;
    const hashPassword = (await bcrypt.hash(password, salt)) as string;
    await this.adminService.create({
      ...createAuthDto,
      password: hashPassword,
      salt: salt,
      roles: [Role.Admin],
    });
    await this.emailService.sendUserPassword(password, createAuthDto.email);
  }

  async login(loginAuthDto: LoginAuthDto) {
    return await this.signJWT(loginAuthDto);
  }

  async signJWT(loginAuthDto: LoginAuthDto) {
    const email = loginAuthDto.email;
    const password = loginAuthDto.password;
    const user = await this.adminService.findOneByEmail(email);
    const hashedPassword = await bcrypt.hash(password, user.salt);
    const isMatch = hashedPassword === user.password;
    if (!user || !isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
