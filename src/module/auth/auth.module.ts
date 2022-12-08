import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AUTH_REPOSITORY } from './application/repository/IAuthRepository';
import { AuthService } from './application/service/auth.service';
import { JwtStrategy } from './application/strategy/jwt.strategy';
import { AuthRepository } from './infrastructure/auth.repository';
import { AuthSchema } from './infrastructure/auth.schema';
import { AuthController } from './interface/auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([AuthSchema]),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    {
      useClass: AuthRepository,
      provide: AUTH_REPOSITORY,
    },
  ],
})
export class AuthModule {}
