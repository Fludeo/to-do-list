import { Auth } from 'src/module/auth/domain/auth.entity';
import { Task } from 'src/module/task/domain/task.entity';

export class User {
  id: number | null;
  name: string;
  lastName: string;
  email: string;
  hash: string;
  tasks?: Array<Task>;
  refreshToken: Array<Auth>;
}
