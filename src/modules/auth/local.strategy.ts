import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.service';

/**
 * PassportStrategy() 这个方法存在第二个参数 name 用来指定名字
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
    // 如果你的字段默认不是 username 可以通过这样进行修改
    // super({ usernameField: "email" })
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    // const user = this.authService.validate(username, password);
    // const user = await this.authService.validateAsyncB(username, password);
    const user = await this.authService.validateAsync(username, password);
    // 如果账号密码匹配不到用户抛出错误
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
