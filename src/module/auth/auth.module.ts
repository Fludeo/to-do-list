import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AUTH_REPOSITORY } from './application/repository/IAuthRepository';
import { AuthService } from './application/service/auth.service';
import { AuthRepository } from './infrastructure/auth.repository';
import { AuthController } from './interface/auth.controller';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      useClass: AuthRepository,
      provide: AUTH_REPOSITORY,
    },
  ],
})
export class AuthModule {}
