import { Module } from '@nestjs/common';
import { TASK_REPOSITORY } from './application/repository/ITaskRepository';
import { TaskService } from './application/service/task.service';
import { TaskRepository } from './infrastructure/task.repository';
import { TaskController } from './interface/task.controller';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      useClass: TaskRepository,
      provide: TASK_REPOSITORY,
    },
  ],
})
export class TaskModule {}
