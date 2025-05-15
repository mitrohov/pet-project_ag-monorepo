import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';
import { BoardColumnAggregationSchema } from './board-column';
import { ColumnTaskStatusAggregationSchema } from './column-task-status';

export const ColumnTaskSchema = z.object({
  title: z.string()
    .min(3, 'Заголовок задачи должен быть не менее 3 символов')
    .max(50, 'Заголовок задачи должен быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  description: z.string().optional(),
  boardColumnId: z.number(),
  columnTaskStatusId: z.number(),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const ColumnTaskWithIdSchema = ColumnTaskSchema.extend({
  id: z.string(),
});

export const ColumnTaskAggregationSchema = ColumnTaskSchema.extend({
  id: z.string(),
  boardColumn: BoardColumnAggregationSchema,
  columnTaskStatus: ColumnTaskStatusAggregationSchema.optional()
});

export class ColumnTaskDto extends createZodDto(ColumnTaskSchema) {}
export class ColumnTaskWithIdDto extends createZodDto(ColumnTaskWithIdSchema) {}

export type ColumnTask = z.infer<typeof ColumnTaskSchema>
export type ColumnTaskWithId = z.infer<typeof ColumnTaskWithIdSchema>
export type ColumnTaskAggregation = z.infer<typeof ColumnTaskAggregationSchema>

export interface ColumnTaskDragStartParams {
  columnId: number
  taskId: number
}
