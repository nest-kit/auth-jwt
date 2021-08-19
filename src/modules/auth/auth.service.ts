import { Injectable } from '@nestjs/common';
import { UserEntity, UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  /**
   * Nestjs 将会自动处理此参数
   *
   * @param userService 注入 UserService 来自 UserModule 内
   * @param jwtService 注入 JwtModule 重的 JwtService 提供签发 Jwt Access Token 功能
   */
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  singUser(user: UserEntity): { access_token: string } {
    const payload = {
      username: user.username,
      date: new Date().toString(),
      text: '加密token前的信息',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  validate(username: string, password: string): UserEntity | undefined {
    // 查找一个用户
    const user = this.userService.loginUser(username);
    // 如果密码匹配返回
    if (user && user.password === password) {
      return user;
    }
    return undefined;
  }

  /**
   * 异步验证用户
   * @param username
   * @param password
   */
  validateAsync(
    username: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    return new Promise<UserEntity | undefined>((resolve) => {
      this.userService.loginUserAsync(username).then((user) => {
        if (user && user.password === password) {
          resolve(user);
        } else {
          resolve(undefined);
        }
      });
    });
  }

  /**
   * 异步写法 第二版本，这个可能是见到最多的但是推荐上方那种写法。
   * @param username
   * @param password
   */
  async validateAsyncB(
    username: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    const user = await this.userService.loginUserAsync(username);

    if (user && user.password === password) {
      return user;
    }
    return undefined;
  }
}
