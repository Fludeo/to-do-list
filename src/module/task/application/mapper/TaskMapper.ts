import { Injectable } from '@nestjs/common';
import { Task } from '../../domain/task.entity';
import { NewTaskDto } from '../dto';
import { PriorityRange, TaskDto } from '../dto/taskDto';
import { UpdateTaskDto } from '../dto/updateTaskDto';

@Injectable()
export class TaskMapper {
  updateTaskDtoToEntity(dto: UpdateTaskDto) {
    const taskEntity = new Task();
    taskEntity.id = dto.id;
    taskEntity.title = dto.title;
    taskEntity.description = dto.description;
    taskEntity.priority = dto.priority;
    taskEntity.date = dto.date;
    return taskEntity;
  }
  newTaskDtoToEntity(dto: NewTaskDto): Task {
    const taskEntity = new Task();
    taskEntity.title = dto.title;
    taskEntity.description = dto.description;
    taskEntity.priority = dto.priority;
    taskEntity.date = dto.date;
    return taskEntity;
  }

  fromEntityToTaskDto(taskEntity: Task) {
    const dto = new TaskDto();
    dto.id = taskEntity.id;
    dto.title = taskEntity.title;
    dto.description = taskEntity.description;
    dto.priority = taskEntity.priority as PriorityRange;
    dto.date = taskEntity.date;
    return dto;
  }
}
