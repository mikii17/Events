import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/admin/admin.service';
import { Role } from './enums/role.enum';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async logout(userId: string) {
    await this.adminService.updateRefreshToken(userId, '');
  }

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
    return { email: createAuthDto.email };
  }

  async login(loginAuthDto: LoginAuthDto) {
    return await this.signJWT(loginAuthDto);
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.adminService.findOneById(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    const refreshTokenGen = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_RT_SECRET'),
      expiresIn: '7d',
    });

    const tokens = {
      access_token: await this.jwtService.signAsync(payload),
      refreshToken: refreshTokenGen,
      roles: user.roles,
    };

    await this.adminService.updateRefreshToken(userId, tokens.refreshToken);
    return { access_token: tokens.access_token, roles: tokens.roles };
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
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_RT_SECRET'),
      expiresIn: '7d',
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken);
    await this.adminService.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      roles: user.roles,
      refreshToken: refreshToken,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
