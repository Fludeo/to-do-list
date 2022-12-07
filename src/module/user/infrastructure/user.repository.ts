import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../application/repository/IUserRepository';
import { User } from '../domain/user.entity';

@Injectable({})
export class UserRepository implements IUserRepository {
  async getUserById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async getUserByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
