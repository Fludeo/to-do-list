import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SignupDto } from 'src/module/auth/application/dto';
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
    if (user === null)
      throw new NotFoundException(`User with email: ${email} not found`);
    return user;
  }

  async addUser(dto: SignupDto): Promise<User> {
    const newUser = new User();
    newUser.id = null;
    newUser.name = dto.name;
    newUser.lastName = dto.lastName;
    newUser.email = dto.email;
    newUser.hash = dto.password;
    const savedUser = await this.userRepository.saveUser(newUser);
    return savedUser;
  }
}
