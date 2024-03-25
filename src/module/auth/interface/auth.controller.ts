import { Body, Controller, Get, Post } from '@nestjs/common';
import { Req, Res } from '@nestjs/common/decorators';
import { Request, Response } from 'express';
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
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const token = await this.authService.login(dto, res);
    console.log('hola');
    res.json(token);
  }

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    await this.authService.signup(dto);
  }

  @Get('session')
  async getSession(@Req() req: Request) {
    const token = await this.authService.getSession(req);
    return token;
  }

  @Get('resetdb')
  async resetDb() {
    await this.dataSource.dropDatabase();
    await this.dataSource.synchronize(true);
  }
}
