import { Controller, Post } from '@nestjs/common';
import { UserService } from '../application/service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
