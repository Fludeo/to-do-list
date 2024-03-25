import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_REPOSITORY } from './application/repository/IUserRepository';
import { UserService } from './application/service/user.service';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { UserSchema } from './infrastructure/persistence/entities/user.schema';
import { UserController } from './interface/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      useClass: UserRepository,
      provide: USER_REPOSITORY,
    },
  ],
  exports: [
    UserService,
    {
      useClass: UserRepository,
      provide: USER_REPOSITORY,
    },
  ],
})
export class UserModule {}
