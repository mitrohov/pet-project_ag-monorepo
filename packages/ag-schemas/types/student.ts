import { z } from 'zod'
import { createZodDto } from 'nestjs-zod';
import { ColorWithIdSchema } from './color';
import { EnglishLevelWithIdSchema } from './english-level';
import { PurposeLessonWithIdSchema } from './purpose-lesson';
import { StudentScheduleWithIdSchema } from './student-schedule'

export const StudentSchema = z.object({
  fio: z.string()
    .min(3, 'Кол-во занятий в неделю должно быть не менее 3 символов')
    .max(20, 'Кол-во занятий в неделю должно быть не более 20 символов')
    .nonempty('Это поле обязательное'),
  qtyLessonsPerWeek: z.number()
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
    .min(1, 'Кол-во занятий в неделю должно быть не менее 1')
    .max(10, 'Кол-во занятий в неделю должно быть не более 10'),
  lessonCost: z.number()
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
    .min(500, 'Стоимость урока должна быть не менее 500')
    .max(3000, 'Стоимость урока должно быть не более 3000'),
  description: z.string().max(1500, 'Описание должно быть не более 1500 символов').nullable(),
  progressMeLogin: z.string().max(50, 'Логин ProgressMe должен быть не более 50 символов').nullable(),
  progressMePassword: z.string()
    .max(50, 'Пароль ProgressMe должен быть не более 50 символов')
    .nullable(),
  lessonTime: z.number()
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
    .min(30, 'Время урока должно быть не менее 30')
    .max(90, 'Время урока должно быть не более 90'),
  englishLevelId: z.number()
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
    .max(999999, 'englishLevelId должно быть не более 999999'),
  purposeLessonId: z.number()
    .positive('Значение должно быть положительным числом')
    .int('Значение должно быть целым числом')
    .max(999999, 'purposeLessonId должно быть не более 999999'),
  phone: z.string().max(50, 'Телефон должно быть не более 50 символов').nullable(),
  social: z.string().max(1000, 'Соц. сети должны быть не более 1000 символов').nullable(),
  colorId: z.number()
    .max(999999, 'colorId должно быть не более 999999'),
  isMock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
})

export const StudentWithIdSchema = StudentSchema.extend({
  id: z.string(),
});

export const StudentAggregationSchema = StudentSchema.extend({
  id: z.string(),
  studentSchedules: z.array(StudentScheduleWithIdSchema),
  purposeLesson: PurposeLessonWithIdSchema.optional(),
  englishLevel: EnglishLevelWithIdSchema.optional(),
  color: ColorWithIdSchema.optional(),
});

export class StudentDto extends createZodDto(StudentSchema) {}
export class StudentWithIdDto extends createZodDto(StudentWithIdSchema) {}

export type Student = z.infer<typeof StudentSchema>
export type StudentWithId = z.infer<typeof StudentWithIdSchema>
export type StudentAggregation = z.infer<typeof StudentWithIdSchema>
