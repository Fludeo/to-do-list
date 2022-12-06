import { Injectable } from '@nestjs/common';
import { ITaskRepository } from '../application/repository/ITaskRepository';
import { Task } from '../domain/task.entity';

@Injectable({})
export class TaskRepository implements ITaskRepository {
  getTaskById(id: number): Promise<Task> {
    throw new Error('Method not implemented.');
  }
}
