import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  // 在 UserModule 中声明 UserService
  providers: [UserService],
  // Provider 声明工作范围是本模块内，如果其他模块需要调用UserService那么就需要抛出
  // 此 exports 不同于 es6 的 export
  exports: [UserService],
})
export class UserModule {}
