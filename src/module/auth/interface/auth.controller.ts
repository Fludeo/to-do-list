import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, SignupDto } from '../application/dto';

import { AuthService } from '../application/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(`login`)
  async login(@Body() dto: LoginDto) {
    try {
      const token = await this.authService.login(dto);
      return token;
    } catch (err) {
      throw err;
    }
  }

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    await this.authService.signup(dto);
  }
}
