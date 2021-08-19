import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LocalMailStrategy } from './local-mail.strategy';

/**
 * 鉴权模块
 */
@Module({
  // 导入用户模块这里需要调用用户数据
  // PassportModule 验证模块
  imports: [UserModule, PassportModule],
  // 在 AuthModule 中声明 AuthService
  // LocalStrategy 为自己实现的验证
  // LocalMailStrategy 当传入字段不同时 local 的使用方式
  providers: [AuthService, LocalStrategy, LocalMailStrategy],
  // Provider 声明工作范围是本模块内，如果其他模块需要调用 AuthService 那么就需要抛出
  // 此 exports 不同于 es6 的 export
  exports: [AuthService],
})
export class AuthModule {}
