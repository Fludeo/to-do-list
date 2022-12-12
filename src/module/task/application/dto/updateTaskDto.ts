import { IsDate, IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';

const range = [1, 2, 3, 4, 5] as const;
export type PriorityRange = typeof range[number];
export class UpdateTaskDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsInt()
  @Matches('^[1-5]$', '', { message: 'Must be between 1 to 5' })
  priority: PriorityRange;

  @IsNotEmpty()
  @IsInt()
  user: number;
}
