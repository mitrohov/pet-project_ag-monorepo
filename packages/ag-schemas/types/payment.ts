import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';
import { LessonWithIdSchema } from './lesson'

export const PaymentSchema = z.object({
  title: z.string()
    .min(3, 'Название оплаты должно быть не менее 3 символов')
    .max(50, 'Название оплаты должно быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  date: z.string().nonempty('Это поле обязательное'),
  sum: z.number()
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
    .min(500, 'Сумма должна быть не менее 500')
    .max(50000, 'Сумма должна быть не более 50000'),
  lessonQty: z.number()
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
    .min(1, 'Количество уроков должно быть не менее 1')
    .max(50, 'Количество уроков должно быть не более 50'),
  studentId: z.number()
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
    .max(999999, 'studentId должно быть не более 999999'),
  messageSent: z.boolean(),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const PaymentWithIdSchema = PaymentSchema.extend({
  id: z.string(),
});

export const PaymentAggregationSchema = PaymentSchema.extend({
  id: z.string(),
  lessons: z.array(LessonWithIdSchema)
});

export class PaymentDto extends createZodDto(PaymentSchema) {}
export class PaymentWithIdDto extends createZodDto(PaymentWithIdSchema) {}

export type Payment = z.infer<typeof PaymentSchema>
export type PaymentWithId = z.infer<typeof PaymentWithIdSchema>
export type PaymentAggregation = z.infer<typeof PaymentAggregationSchema>
