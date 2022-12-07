import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TASK_REPOSITORY } from './application/repository/ITaskRepository';
import { TaskService } from './application/service/task.service';
import { TaskRepository } from './infrastructure/task.repository';
import { TaskSchema } from './infrastructure/task.schema';
import { TaskController } from './interface/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskSchema])],
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
