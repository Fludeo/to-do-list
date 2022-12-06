import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { TaskModule } from './module/task/task.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [AuthModule, UserModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
