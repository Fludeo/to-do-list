import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IAuthRepository } from '../application/repository/IAuthRepository';
import { Auth } from '../domain/auth.entity';

@Injectable({})
export class AuthRepository implements IAuthRepository {
  private readonly repository: Repository<Auth>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Auth);
  }
  getRefreshToken(id: number): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
