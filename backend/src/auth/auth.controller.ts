import { Controller, Post, Body, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/role.guard';
import { Roles } from './decorator/role.decorator';
import { Role } from './enums/role.enum';
import { RefreshAuthGuard } from './guard/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('signup')
  async signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('login')
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const tokens = await this.authService.login(loginAuthDto);
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${tokens.refreshToken}; HttpOnly; secure; Max-Age=${
        60 * 60 * 24 * 7
      };`,
    );
    return { access_token: tokens.access_token, roles: tokens.roles };
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const userId = req['user'].sub;
    const refreshToken = req['cookies'].refreshToken;

    return await this.authService.refresh(userId, refreshToken);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: any) {
    const userId = req['user'].sub;
    res.setHeader('Set-Cookie', `refreshToken=; HttpOnly; secure; Max-Age=0;`);
    await this.authService.logout(userId);
  }
}
