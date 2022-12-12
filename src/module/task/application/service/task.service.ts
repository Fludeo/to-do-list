import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from 'src/module/user/domain/user.entity';
import { Task } from '../../domain/task.entity';
import {
  ITaskRepository,
  TASK_REPOSITORY,
} from '../repository/ITaskRepository';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: ITaskRepository,
  ) {}

  async addTask(user: User, newTask: Task): Promise<Task> {
    if (!(newTask instanceof Task)) throw new UnprocessableEntityException();
    newTask.user = user;
    const savedTask = await this.taskRepository.saveTask(newTask);
    return savedTask;
  }
}
