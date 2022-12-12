import { User } from '../../user/domain/user.entity';

export class Task {
  id: number | null;
  title: string;
  description: string;
  date: Date;
  priority: number;
  user: User;
}
