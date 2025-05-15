import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';

export const EnglishLevelSchema = z.object({
  title: z.string()
    .min(1, 'Уровень английского должен быть не менее 1 символа')
    .max(50, 'Уровень английского должен быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const EnglishLevelWithIdSchema = EnglishLevelSchema.extend({
  id: z.string(),
});

export class EnglishLevelDto extends createZodDto(EnglishLevelSchema) {}
export class EnglishLevelWithIdDto extends createZodDto(EnglishLevelWithIdSchema) {}

export type EnglishLevel = z.infer<typeof EnglishLevelSchema>
export type EnglishLevelWithId = z.infer<typeof EnglishLevelWithIdSchema>