import { User } from '../../domain/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export interface IUserRepository {
  getUserById(id: number): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
}
