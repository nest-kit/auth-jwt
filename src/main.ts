import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 主程序入口
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 监听端口
  await app.listen(3000);
}
bootstrap();
