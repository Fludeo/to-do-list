import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { User } from '../../domain/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../repository/IUserRepository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
    if (user !== null)
      throw new EntityNotFoundError(
        User,
        `User with email: ${email} already exists`,
      );
    return user;
  }
}
