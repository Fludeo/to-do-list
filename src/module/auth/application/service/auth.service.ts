import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/module/user/application/service/user.service';
import { LoginDto, SignupDto } from '../dto';
import * as argon from 'argon2';
import {
  AUTH_REPOSITORY,
  IAuthRepository,
} from '../repository/IAuthRepository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: IAuthRepository,
    @Inject(UserService) private userService: UserService,
    private jwt: JwtService,
  ) {}
  async login(dto: LoginDto) {
    throw new Error('Method not implemented.');
  }
  async signup(dto: SignupDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (user) throw new ForbiddenException('Credentials taken');
    const hash: string = await argon.hash(dto.password);
  }
}
