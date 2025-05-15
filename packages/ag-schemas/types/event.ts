import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';
import { EventCategoryAggregationSchema } from './event-category'

export const EventSchema = z.object({
  title: z.string()
    .min(3, 'Название события должно быть не менее 3 символов')
    .max(100, 'Название события должно быть не более 100 символов')
    .nonempty('Это поле обязательное'),
  eventCategoryId: z.number()
    .max(999999, 'eventCategoryId должно быть не более 999999'),
  description: z.string().max(1000, 'Описание должно быть не более 1000 символов').nullable(),
  startTime: z.string().nonempty('Это поле обязательное'),
  endTime: z.string().nonempty('Это поле обязательное'),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const EventWithIdSchema = EventSchema.extend({
  id: z.string()
});

export const EventAggregationSchema = EventSchema.extend({
  id: z.string(),
  eventCategory: EventCategoryAggregationSchema.optional()
});

export class EventDto extends createZodDto(EventSchema) {}
export class EventWithIdDto extends createZodDto(EventWithIdSchema) {}

export type Event = z.infer<typeof EventSchema>
export type EventWithId = z.infer<typeof EventWithIdSchema>
export type EventAggregation = z.infer<typeof EventAggregationSchema>
