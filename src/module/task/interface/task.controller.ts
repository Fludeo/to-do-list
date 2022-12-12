import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common/decorators';
import { Request } from 'express';
import {
  ITaskRepository,
  TASK_REPOSITORY,
} from '../application/repository/ITaskRepository';
import { TaskService } from '../application/service/task.service';
import { Task } from '../domain/task.entity';
import { User } from '../../user/domain/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { NewTaskDto } from '../application/dto';
import { TaskMapper } from '../application/mapper/TaskMapper';
import { UpdateTaskDto } from '../application/dto/updateTaskDto';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TaskController {
  constructor(
    private taskService: TaskService,
    @Inject(TASK_REPOSITORY) private taskRepository: ITaskRepository,
    @Inject(TaskMapper) private taskMapper: TaskMapper,
  ) {}

  @Get()
  async getTasks(
    @Req() req: Request,
  ): Promise<{ tasks: Task[]; count: number }> {
    const user = req.user as User;
    const { tasks, count } = await this.taskRepository.getAll(user);
    return { tasks, count };
  }

  @Post()
  async addTask(
    @Req() req: Request & { user: User },
    @Body() dto: NewTaskDto,
  ): Promise<Task> {
    const newTask = this.taskMapper.newTaskDtoToEntity(dto);
    const createdTask = await this.taskService.addTask(req.user, newTask);
    return createdTask;
  }

  @Put()
  async updateTask(@Body() dto: UpdateTaskDto): Promise<Task> {
    const task = this.taskMapper.updateTaskDtoToEntity(dto);
    return await this.taskRepository.saveTask(task);
  }

  @Delete()
  async deleteTask(@Body() dto: UpdateTaskDto): Promise<Task> {
    const task = this.taskMapper.updateTaskDtoToEntity(dto);
    return await this.taskRepository.saveTask(task);
  }
}
