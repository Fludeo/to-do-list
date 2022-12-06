import { User } from '../../domain/user.entity';

export interface IUserRepository {
  getUserById(id: number): Promise<User>;
  getUserByEmail(id: number): Promise<User>;
}
