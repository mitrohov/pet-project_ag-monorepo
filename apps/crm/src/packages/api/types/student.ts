import { object, string, number, type InferType } from 'yup'
import type {
  GetStudentSchedule,
  GetEnglishLevel,
  GetColor,
  GetPurposeLesson
} from '@/packages/api/types'

export const PostStudentSchema = object({
  fio: string()
    .min(3, 'Кол-во занятий в неделю должно быть не менее 3 символов')
    .max(20, 'Кол-во занятий в неделю должно быть не более 20 символов')
    .required('Это поле обязательное'),
  qtyLessonsPerWeek: number()
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .min(1, 'Кол-во занятий в неделю должно быть не менее 1')
    .max(10, 'Кол-во занятий в неделю должно быть не более 10')
    .required('Это поле обязательное'),
  lessonCost: number()
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .min(500, 'Стоимость урока должна быть не менее 500')
    .max(3000, 'Стоимость урока должно быть не более 3000')
    .required('Это поле обязательное'),
  description: string().max(1500, 'Описание должно быть не более 1500 символов').nullable(),
  progressMeLogin: string().max(50, 'Логин ProgressMe должен быть не более 50 символов').nullable(),
  progressMePassword: string()
    .max(50, 'Пароль ProgressMe должен быть не более 50 символов')
    .nullable(),
  lessonTime: number()
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .min(30, 'Время урока должно быть не менее 30')
    .max(90, 'Время урока должно быть не более 90')
    .required('Это поле обязательное'),
  englishLevelId: number()
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .max(999999, 'englishLevelId должно быть не более 999999')
    .required('Это поле обязательное'),
  purposeLessonId: number()
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .max(999999, 'purposeLessonId должно быть не более 999999')
    .required('Это поле обязательное'),
  phone: string().max(50, 'Телефон должно быть не более 50 символов').nullable(),
  social: string().max(1000, 'Соц. сети должны быть не более 1000 символов').nullable(),
  colorId: number()
    .max(999999, 'colorId должно быть не более 999999')
    .required('Это поле обязательное')
})

export type PostStudent = InferType<typeof PostStudentSchema>

export interface GetStudent {
  id: number
  fio: string
  lessonTime: number
  lessonCost: number
  description: string
  qtyLessonsPerWeek: number
  phone: string
  social: string
  progressMeLogin: string
  progressMePassword: string
  englishLevelId: number
  purposeLessonId: number
  color?: GetColor
  colorId: number
  isDeleted?: boolean
  isMock?: boolean
  studentSchedules: GetStudentSchedule[]
  purposeLesson?: GetPurposeLesson
  englishLevel?: GetEnglishLevel
}
