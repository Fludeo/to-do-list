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
import { Request, Response } from 'express';
import { Auth } from '../../domain/auth.entity';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { User } from '../../../user/domain/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: IAuthRepository,
    @Inject(UserService) private userService: UserService,
    private jwt: JwtService,
  ) {}
  async login(dto: LoginDto, res: Response) {
    const user = await this.userService.getUserByEmail(dto.email);
    const match = await argon.verify(user.hash, dto.password);
    if (!match) throw new ForbiddenException('Wrong password');

    const access_token = await this.generateAccessToken(user);

    const refresh_token = await this.generateRefreshToken(user);

    await setHttpOnlyCookie(refresh_token, res);

    const session = new Auth(refresh_token, user);

    await this.authRepository.saveSession(session);

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

  async getSession(req: Request): Promise<{ access_token: string }> {
    const cookie = req.headers.cookie;

    if (cookie === undefined) {
      throw new UnauthorizedException();
    }
    const httpOnlyToken: string = cookie?.split('=')[1];

    await this.verifyToken(httpOnlyToken, process.env.JWT_REFRESH_SECRET);

    const session = await this.authRepository.getSession(httpOnlyToken);
    if (session === null) {
      throw new UnauthorizedException();
    }

    const access_token = await this.generateAccessToken(session.user);
    return { access_token: access_token };
  }

  async generateAccessToken(user: User) {
    const accessToken = await this.jwt.signAsync(
      { sub: user.id, email: user.email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      },
    );
    return accessToken;
  }
  async generateRefreshToken(user: User) {
    const refreshToken = await this.jwt.signAsync(
      { sub: user.id, email: user.email },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
      },
    );
    return refreshToken;
  }

  async verifyToken(
    token: string,
    secret: string,
  ): Promise<{ sub: number; email: string }> {
    try {
      const decodedPayload = await this.jwt.verifyAsync(token, {
        secret: secret,
      });
      return decodedPayload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

async function setHttpOnlyCookie(
  refresh_token: string,
  res: Response,
): Promise<void> {
  res.cookie(process.env.HTTPONLY_COOKIE_NAME, refresh_token, {
    httpOnly: true,
    secure: true,
    path: '/auth/session',
    expires: new Date(new Date().getTime() + 60 * 60 * 24 * 7 * 1000),
  });
}
