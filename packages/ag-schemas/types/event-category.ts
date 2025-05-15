import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';
import { ColorWithIdSchema } from './color';

export const EventCategorySchema = z.object({
  title: z.string()
    .min(3, 'Название должно быть не более 3 символов')
    .max(50, 'Название должно быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  colorId: z.number()
    .max(999999, 'colorId должно быть не более 999999')
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом'),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const EventCategoryWithIdSchema = EventCategorySchema.extend({
  id: z.string(),
});

export const EventCategoryAggregationSchema = EventCategorySchema.extend({
  id: z.string(),
  color: ColorWithIdSchema.optional()
});

export class EventCategoryDto extends createZodDto(EventCategorySchema) {}
export class EventCategoryWithIdDto extends createZodDto(EventCategoryWithIdSchema) {}

export type EventCategory = z.infer<typeof EventCategorySchema>
export type EventCategoryWithId = z.infer<typeof EventCategoryWithIdSchema>
export type EventCategoryAggregation = z.infer<typeof EventCategoryAggregationSchema>
