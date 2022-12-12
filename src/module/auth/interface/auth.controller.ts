import { Body, Controller, Get, Post } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import { DataSource } from 'typeorm';
import { LoginDto, SignupDto } from '../application/dto';

import { AuthService } from '../application/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly dataSource: DataSource,
  ) {}

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

  @Get('resetdb')
  async resetDb() {
    await this.dataSource.dropDatabase();
    await this.dataSource.synchronize(true);
  }
}
