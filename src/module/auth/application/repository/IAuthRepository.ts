import { Auth } from '../../domain/auth.entity';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface IAuthRepository {
  saveSession(session: Auth): Promise<void>;
  getSession(token: string): Promise<Auth>;
}
