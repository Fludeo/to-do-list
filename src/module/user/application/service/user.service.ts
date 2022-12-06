import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
}
