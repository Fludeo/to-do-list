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
  async saveSession(session: Auth): Promise<void> {
    this.repository.save(session);
  }
  async getSession(token: string): Promise<Auth> {
    const session = await this.repository.findOne({
      where: { refreshToken: token },
      relations: ['user'],
    });
    return session;
  }
}
