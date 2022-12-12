import { User } from '../../../user/domain/user.entity';
import { Task } from '../../domain/task.entity';

export const TASK_REPOSITORY = 'TASK_REPOSITORY';

export interface ITaskRepository {
  getTaskById(id: number): Promise<Task>;
  getAll(user: User): Promise<{ tasks: Task[]; count: number }>;
  saveTask(task: Task): Promise<Task>;
  deleteTask(taskId: number): Promise<void>;
}
