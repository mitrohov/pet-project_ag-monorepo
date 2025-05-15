import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';
import { PaymentAggregationSchema } from './payment'
import { StudentAggregationSchema } from './student'

export const LessonSchema = z.object({
  studentId: z.number()
    .max(999999, 'studentId должно быть не более 999999')
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом'),
  title: z.string()
    .min(3, 'Название урока должно быть не менее 3 символов')
    .max(50, 'Название урока должно быть не более 50 символов')
    .nonempty('Это поле обязательное'),
  hasHomeWork: z.boolean(),
  description: z.string().max(50, 'Описание должно быть не более 50 символов').nullable(),
  startTime: z.string().nonempty('Это поле обязательное'),
  endTime: z.string().nonempty('Это поле обязательное'),
  paymentId: z.number()
    .max(999999, 'paymentId должно быть не более 999999')
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
    .nullable(),
  isMissed: z.boolean(),
  isReschedule: z.boolean(),
  isPreparationComplete: z.boolean(),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const LessonWithIdSchema = LessonSchema.extend({
  id: z.string(),
  payment: PaymentAggregationSchema.nullable(),
  student: StudentAggregationSchema.nullable(),
  lessonsLeftToCompleteOnPayment: z.number()
    .int('Значение должно быть целым числом'),
});

export class LessonDto extends createZodDto(LessonSchema) {}
export class LessonWithIdDto extends createZodDto(LessonWithIdSchema) {}

export type Lesson = z.infer<typeof LessonSchema>
export type LessonWithId = z.infer<typeof LessonWithIdSchema>

export interface DatesForLesson {
  startTime: Date
  endTime: Date
}
