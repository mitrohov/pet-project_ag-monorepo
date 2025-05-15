import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';
import { ColumnTaskAggregationSchema } from './column-task'

export const BoardColumnSchema = z.object({
  title: z.string()
    .min(3, 'Название колонки должно быть не менее 3 символов')
    .max(50, 'Название колонки должно быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  boardId: z.number().int(),
  sortIndex: z.number().nullable(),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const BoardColumnWithIdSchema = BoardColumnSchema.extend({
  id: z.string(),
});

export const BoardColumnAggregationSchema = BoardColumnSchema.extend({
  id: z.string(),
  columnTasks: z.array(ColumnTaskAggregationSchema)
});

export class BoardColumnDto extends createZodDto(BoardColumnSchema) {}
export class BoardColumnWithIdDto extends createZodDto(BoardColumnWithIdSchema) {}

export type BoardColumn = z.infer<typeof BoardColumnSchema>
export type BoardColumnWithId = z.infer<typeof BoardColumnWithIdSchema>
export type BoardColumnAggregation = z.infer<typeof BoardColumnAggregationSchema>
