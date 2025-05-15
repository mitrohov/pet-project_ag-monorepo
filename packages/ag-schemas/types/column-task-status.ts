import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';
import { ColumnTaskAggregationSchema } from './column-task'
import { ColorWithIdSchema } from './color'

export const ColumnTaskStatusSchema = z.object({
  id: z.number()
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
    .optional(),
  title: z.string()
    .min(3, 'Название статуса должно быть не менее 3 символов')
    .max(100, 'Название статуса должно быть не более 100 символов')
    .nonempty('Это поле обязательное'),
  colorId: z.number()
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
})

export const ColumnTaskStatusWithIdSchema = ColumnTaskStatusSchema.extend({
  id: z.string(),
});

export const ColumnTaskStatusAggregationSchema = ColumnTaskStatusSchema.extend({
  id: z.string(),
  columnTasks: z.array(ColumnTaskAggregationSchema),
  color: ColorWithIdSchema
});

export class ColumnTaskStatusDto extends createZodDto(ColumnTaskStatusSchema) {}
export class ColumnTaskStatusWithIdDto extends createZodDto(ColumnTaskStatusWithIdSchema) {}

export type ColumnTaskStatus = z.infer<typeof ColumnTaskStatusSchema>
export type ColumnTaskStatusWithId = z.infer<typeof ColumnTaskStatusWithIdSchema>
export type ColumnTaskStatusAggregation = z.infer<typeof ColumnTaskStatusAggregationSchema>
