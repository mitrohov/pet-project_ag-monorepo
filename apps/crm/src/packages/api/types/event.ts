import { object, string, number, type InferType } from 'yup'
import type { GetEventCategory } from '@/packages/api/types'

export const PostEventSchema = object({
  title: string()
    .min(3, 'Название события должно быть не менее 3 символов')
    .max(100, 'Название события должно быть не более 100 символов')
    .required('Это поле обязательное'),
  eventCategoryId: number()
    .max(999999, 'eventCategoryId должно быть не более 999999')
    .required('Категория событий обязательное поле'),
  description: string().max(1000, 'Описание должно быть не более 1000 символов').nullable(),
  startTime: string().required('Это поле обязательное'),
  endTime: string().required('Это поле обязательное')
})

export type PostEvent = InferType<typeof PostEventSchema>

export interface GetEvent {
  id: number
  title: string
  eventCategoryId: number
  description: string
  startTime: string
  endTime: string
  isDeleted?: boolean
  isMock?: boolean
  eventCategory?: GetEventCategory
}
