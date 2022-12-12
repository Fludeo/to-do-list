import { User } from '../../user/domain/user.entity';

export class Auth {
  id: number;
  refreshToken: string;
  user: User;
}
