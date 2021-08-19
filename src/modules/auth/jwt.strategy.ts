import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './jwt.consts';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // 配置 jwt 验证相关属性
    super({
      // jwt token 获取方式
      // fromAuthHeaderAsBearerToken 表示需要 header 头为 authorization 并且内容为 Bearer 密钥
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // 从 jwt 里拿出对应的信息
    // AuthService 里的 singUser 方法
    return {
      data: payload.data,
      username: payload.username,
      text: payload.text,
      custom: '解密后额外附加信息',
    };
  }
}
