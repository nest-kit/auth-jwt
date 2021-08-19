import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
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
  async loginA(@Request() req) {
    return req.user;
  }
}
