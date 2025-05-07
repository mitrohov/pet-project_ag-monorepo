import { object, string, number, boolean, type InferType } from 'yup'
import type { GetLesson } from './lesson'

export const PostPaymentSchema = object({
  title: string()
    .min(3, 'Название оплаты должно быть не менее 3 символов')
    .max(50, 'Название оплаты должно быть не более 50 символов')
    .required('Это поле обязательное'),
  date: string().required('Это поле обязательное'),
  sum: number()
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .min(500, 'Сумма должна быть не менее 500')
    .max(50000, 'Сумма должна быть не более 50000')
    .required('Это поле обязательное'),

  lessonQty: number()
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .min(1, 'Количество уроков должно быть не менее 1')
    .max(50, 'Количество уроков должно быть не более 50')
    .required('Это поле обязательное'),
  studentId: number()
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .max(999999, 'studentId должно быть не более 999999')
    .required('Это поле обязательное'),
  messageSent: boolean()
})

export type PostPayment = InferType<typeof PostPaymentSchema>

export interface GetPayment {
  id: number
  title: string
  date: string
  lessonQty: number
  sum: number
  isMessageSent: boolean
  studentId?: number
  qtyLessonsLeft: number
  lessons?: GetLesson[]
}
