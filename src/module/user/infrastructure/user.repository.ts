import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../application/repository/IUserRepository';
import { User } from '../domain/user.entity';

@Injectable({})
export class UserRepository implements IUserRepository {
  getUserById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
