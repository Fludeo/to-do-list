import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../user/application/service/user.service';
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
    const user = await this.userService.getUserByEmail(dto.email);
    const match = await argon.verify(user.hash, dto.password);
    if (!match) throw new ForbiddenException('Wrong password');
    const access_token = await this.jwt.signAsync(
      { sub: user.id, email: user.email },
      { secret: process.env.JWT_SECRET, expiresIn: '15min' },
    );

    return { access_token: access_token };
  }

  async signup(dto: SignupDto) {
    try {
      const user = await this.userService.getUserByEmail(dto.email);
      if (user) throw new ForbiddenException('Credentials taken');
    } catch (err) {
      if (err instanceof NotFoundException) {
        dto.password = await argon.hash(dto.password);
        return await this.userService.addUser(dto);
      } else throw err;
    }
  }
}
