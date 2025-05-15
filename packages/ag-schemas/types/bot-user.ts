import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';

export const BotUserSchema = z.object({
  userName: z.string()
    .min(3, 'TG user name должно быть не менее 3 символов')
    .max(100, 'TG user name должно быть не более 100 символов')
    .nonempty('Это поле обязательное'),
  role: z.enum(['user', 'admin']),
  chatId: z.number()
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
    .nullable(),
  studentId: z.number()
    .max(999999, 'studentId должно быть не более 999999')
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом'),
  isActive: z.boolean(),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const BotUserWithIdSchema = BotUserSchema.extend({
  id: z.string(),
});

export class BotUserDto extends createZodDto(BotUserSchema) {}
export class BotUserWithIdDto extends createZodDto(BotUserWithIdSchema) {}

export type BotUser = z.infer<typeof BotUserSchema>
export type BotUserWithId = z.infer<typeof BotUserWithIdSchema>