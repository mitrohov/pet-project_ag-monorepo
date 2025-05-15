import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const ColorSchema = z.object({
  title: z.string()
    .min(3, 'Название цвета должно быть не менее 3 символов')
    .max(50, 'Название цвета должно быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  code: z.string()
    .min(3, 'Код цвета должен быть не менее 3 символов')
    .max(50, 'Код цвета должен быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  color: z.string()
    .min(3, 'Цвет шрифта должен быть не менее 3 символов')
    .max(50, 'Цвет шрифта должен быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  backgroundColor: z.string()
    .min(3, 'Цвет фона должен быть не менее 3 символов')
    .max(50, 'Цвет фона должен быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const ColorWithIdSchema = ColorSchema.extend({
  id: z.string(),
});

export class ColorDto extends createZodDto(ColorSchema) {}
export class ColorWithIdDto extends createZodDto(ColorWithIdSchema) {}

export type Color = z.infer<typeof ColorSchema>
export type ColorWithId = z.infer<typeof ColorWithIdSchema>