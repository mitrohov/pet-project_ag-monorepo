import { object, string, number, boolean, type InferType } from 'yup'
import type { GetStudent, GetPayment } from '@/packages/api/types'

export const PostLessonSchema = object({
  studentId: number()
    .max(999999, 'studentId должно быть не более 999999')
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .required('Это поле обязательное'),
  title: string()
    .min(3, 'Название урока должно быть не менее 3 символов')
    .max(50, 'Название урока должно быть не более 50 символов')
    .required('Это поле обязательное'),
  hasHomeWork: boolean(),
  description: string().max(50, 'Описание должно быть не более 50 символов').nullable(),
  startTime: string().required('Это поле обязательное'),
  endTime: string().required('Это поле обязательное'),
  paymentId: number()
    .max(999999, 'paymentId должно быть не более 999999')
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .nullable(),
  isMissed: boolean(),
  isReschedule: boolean(),
  isPreparationComplete: boolean()
})

export type PostLesson = InferType<typeof PostLessonSchema>

export interface GetLesson {
  id: number
  title: string
  startTime: string
  endTime: string
  description: string
  hasHomeWork: boolean
  isMissed: boolean
  isReschedule: boolean
  isPreparationComplete: boolean
  paymentId: number
  studentId: number
  isDeleted?: boolean
  isMock?: boolean
  lessonsLeftToCompleteOnPayment?: number
  paymentLessonQty: number
  payment?: GetPayment | null
  student?: GetStudent | null
}

export interface DatesForLesson {
  startTime: Date
  endTime: Date
}
