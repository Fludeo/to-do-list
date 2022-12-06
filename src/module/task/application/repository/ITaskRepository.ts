import { Task } from '../../domain/task.entity';

export const TASK_REPOSITORY = 'TASK_REPOSITORY';

export interface ITaskRepository {
  getTaskById(id: number): Promise<Task>;
}
