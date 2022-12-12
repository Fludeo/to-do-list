import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

const range = [1, 2, 3, 4, 5] as const;
export type PriorityRange = typeof range[number];
export class NewTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  priority: PriorityRange;
}
