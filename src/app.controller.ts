import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  test() {
    return {
      text: 'hello,world',
    };
  }

  // UseGuards 调用对应的验证方式
  // AuthGuard('local') local 为 local.strategy.ts 里可配置的名字
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  // UseGuards 调用对应的验证方式
  // AuthGuard('local') local 为 local-mail.strategy.ts 里可配置的名字
  @UseGuards(AuthGuard('customEmail'))
  @Post('login_email')
  async loginEmail(@Request() req) {
    return req.user;
  }

  // 使用普通方式登陆，登陆之后返回 jwt token
  @UseGuards(AuthGuard('local'))
  @Post('login_jwt')
  async loginToJwtToken(@Request() req) {
    return this.authService.singUser(req.user);
  }

  // 调用 jwt 相关的验证
  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  async getInfo(@Request() req) {
    return req.user;
  }
}
