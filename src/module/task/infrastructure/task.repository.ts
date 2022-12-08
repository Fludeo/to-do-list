import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ITaskRepository } from '../application/repository/ITaskRepository';
import { Task } from '../domain/task.entity';

@Injectable()
export class TaskRepository implements ITaskRepository {
  private readonly repository: Repository<Task>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Task);
  }
  async getAll(userId: number): Promise<{ tasks: Task[]; count: number }> {
    const [tasks, count] = await this.repository.findAndCount({
      where: { user: userId },
    });
    return { tasks, count };
  }
  async getTaskById(id: number): Promise<Task> {
    const task = await this.repository.findOne({ where: { id: id } });
    return task;
  }
}
