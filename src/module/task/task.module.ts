import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TaskMapper } from './application/mapper/TaskMapper';
import { TASK_REPOSITORY } from './application/repository/ITaskRepository';
import { TaskService } from './application/service/task.service';
import { TaskRepository } from './infrastructure/task.repository';
import { TaskSchema } from './infrastructure/task.schema';
import { TaskController } from './interface/task.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([TaskSchema]), TypeOrmModule],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskMapper,
    {
      useClass: TaskRepository,
      provide: TASK_REPOSITORY,
    },
  ],
})
export class TaskModule {}
