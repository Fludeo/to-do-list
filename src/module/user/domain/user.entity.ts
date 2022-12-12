import { Auth } from 'src/module/auth/domain/auth.entity';
import { Task } from 'src/module/task/domain/task.entity';

export class User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  hash: string;
  tasks?: Task[];
  refreshToken: Auth[];
}
