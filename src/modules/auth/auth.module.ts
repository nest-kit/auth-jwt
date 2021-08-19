import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LocalMailStrategy } from './local-mail.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.consts';
import { JwtStrategy } from './jwt.strategy';

/**
 * 鉴权模块
 */
@Module({
  // 导入用户模块这里需要调用用户数据
  // PassportModule 验证模块
  imports: [
    UserModule,
    PassportModule,
    // JWT 有很多中签名方式，如果你需要其他模式可以查看文档，然后签发对应的密钥
    // 简单的生成方式可以使用 openssl rand -hex 30
    // 如果你需要 RS256 的加密方式
    // ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
    // openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
    // 生成对应的参数，然后配置 publicKey 和 privateKey
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  // 在 AuthModule 中声明 AuthService
  // LocalStrategy 为自己实现的验证
  // LocalMailStrategy 当传入字段不同时 local 的使用方式
  providers: [AuthService, LocalStrategy, LocalMailStrategy, JwtStrategy],
  // Provider 声明工作范围是本模块内，如果其他模块需要调用 AuthService 那么就需要抛出
  // 此 exports 不同于 es6 的 export
  exports: [AuthService],
})
export class AuthModule {}
