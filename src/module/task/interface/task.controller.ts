import { Controller } from '@nestjs/common';
import { Get, Inject, Req, UseGuards } from '@nestjs/common/decorators';
import { Request } from 'express';
import {
  ITaskRepository,
  TASK_REPOSITORY,
} from '../application/repository/ITaskRepository';
import { TaskService } from '../application/service/task.service';
import { Task } from '../domain/task.entity';
import { User } from '../../user/domain/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TaskController {
  constructor(
    private taskService: TaskService,
    @Inject(TASK_REPOSITORY) private taskRepository: ITaskRepository,
  ) {}

  @Get()
  async getTasks(
    @Req() req: Request,
  ): Promise<{ tasks: Task[]; count: number }> {
    const user = req.user as User;
    const { tasks, count } = await this.taskRepository.getAll(user.id);
    return { tasks, count };
  }
}
