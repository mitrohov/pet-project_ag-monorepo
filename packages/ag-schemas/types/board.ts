import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';
import { BoardColumnAggregationSchema } from './board-column'

export const BoardSchema = z.object({
  title: z.string()
    .min(3, 'Название доски должно быть не менее 3 символов')
    .max(100, 'Название доски должно быть не более 100 символов')
    .nonempty('Это поле обязательное'),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const BoardWithIdSchema = BoardSchema.extend({
  id: z.string(),
});

export const BoardAggregationSchema = BoardSchema.extend({
  id: z.string(),
  boardColumns: z.array(BoardColumnAggregationSchema)
});

export class BoardDto extends createZodDto(BoardSchema) {}
export class BoardWithIdDto extends createZodDto(BoardWithIdSchema) {}

export type Board = z.infer<typeof BoardSchema>
export type BoardWithId = z.infer<typeof BoardWithIdSchema>
export type BoardAggregation = z.infer<typeof BoardAggregationSchema>

export interface BoardDragStartParams {
  columnId: number
  taskId: number
}
