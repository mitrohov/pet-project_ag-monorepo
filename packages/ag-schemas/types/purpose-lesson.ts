import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';

export const PurposeLessonSchema = z.object({
  title: z.string()
    .min(3, 'Название цели должно быть не менее 3 символов')
    .max(50, 'Название цели должно быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const PurposeLessonWithIdSchema = PurposeLessonSchema.extend({
  id: z.string(),
});

export class PurposeLessonDto extends createZodDto(PurposeLessonSchema) {}
export class PurposeLessonWithIdDto extends createZodDto(PurposeLessonWithIdSchema) {}

export type PurposeLesson = z.infer<typeof PurposeLessonSchema>
export type PurposeLessonWithId = z.infer<typeof PurposeLessonWithIdSchema>
