import { EntitySchema } from 'typeorm';
import { Task } from '../../../domain/task.entity';

export const TaskSchema = new EntitySchema<Task>({
  name: 'Task',
  target: Task,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    priority: {
      type: Number,
    },
    date: {
      type: Date,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
    },
  },
});
