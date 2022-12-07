const range = [1, 2, 3, 4, 5] as const;
export type PriorityRange = typeof range[number];
export interface TaskDto {
  id: number;
  title: string;
  description: string;
  date: Date;
  priority: PriorityRange;
}
