import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/module/user/application/service/user.service';
import { SignupDto } from '../dto';
import { LoginDto } from '../dto/LoginDto';
import {
  AUTH_REPOSITORY,
  IAuthRepository,
} from '../repository/IAuthRepository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: IAuthRepository,
    @Inject(UserService) private userService: UserService,
  ) {}
  async login(dto: LoginDto) {
    throw new Error('Method not implemented.');
  }
  async signup(dto: SignupDto) {
    throw new Error('Method not implemented.');
  }
}
