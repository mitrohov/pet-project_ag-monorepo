import { object, string, number, type InferType } from 'yup'
import type { GetColor } from '@/packages/api/types'

export const PostEventCategorySchema = object({
  title: string()
    .min(3, 'Название должно быть не более 3 символов')
    .max(50, 'Название должно быть не более 50 символов')
    .required('Это поле обязательное'),
  colorId: number()
    .max(999999, 'colorId должно быть не более 999999')
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .required('Это поле обязательное')
})

export type PostEventCategory = InferType<typeof PostEventCategorySchema>

export interface GetEventCategory {
  id: number
  title: string
  colorId: number
  isDeleted?: boolean
  isMock?: boolean
  color?: GetColor
}
