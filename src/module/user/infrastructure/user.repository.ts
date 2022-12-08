import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IUserRepository } from '../application/repository/IUserRepository';
import { User } from '../domain/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly repository: Repository<User>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }
  async saveUser(user: User): Promise<User> {
    return await this.repository.save(user);
  }
  async getUserById(id: number): Promise<User> {
    return await this.repository.findOneBy({ id: id });
  }
  async getUserByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({ email: email });
  }
}
