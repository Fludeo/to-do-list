import { Controller, Post } from '@nestjs/common';
import { TaskService } from '../application/service/task.service';

@Controller('auth')
export class TaskController {
  constructor(private taskService: TaskService) {}
}
