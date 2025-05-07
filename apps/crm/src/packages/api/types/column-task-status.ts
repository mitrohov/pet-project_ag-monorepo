import { object, string, number, type InferType } from 'yup'
import type { GetColor, GetColumnTask } from '@/packages/api/types'

export const PostColumnTaskStatusSchema = object({
  id: number()
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .optional(),
  title: string()
    .min(3, 'Название статуса должно быть не менее 3 символов')
    .max(100, 'Название статуса должно быть не более 100 символов')
    .required('Это поле обязательное'),
  colorId: number()
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .required('Это поле обязательное')
})

export type PostColumnTaskStatus = InferType<typeof PostColumnTaskStatusSchema>

export interface GetColumnTaskStatus {
  id: number
  title: string
  colorId: string
  color: GetColor
  columnTasks: GetColumnTask[]
}
