import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../application/repository/IAuthRepository';

@Injectable({})
export class AuthRepository implements IAuthRepository {
  getRefreshToken(id: number): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
