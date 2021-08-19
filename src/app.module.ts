import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';

/**
 * 主模块入口
 */
@Module({
  // 加载对应的功能模块
  imports: [AuthModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
