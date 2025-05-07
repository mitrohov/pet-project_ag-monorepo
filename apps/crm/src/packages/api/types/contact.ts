import { object, string, number, type InferType } from 'yup'
import type { GetOrderPlatform } from './order-platform'

export const PostContactSchema = object({
  fio: string()
    .min(3, 'ФИО должно быть не менее 3 символов')
    .max(50, 'ФИО должно быть не более 50 символов')
    .required('Это поле обязательное'),
  mobileNumber: string().max(30, 'Номер должен быть не более 30 символов').nullable(),
  socials: string()
    .min(3, 'Соц. сети должны быть не менее 3 символов')
    .max(500, 'Соц. сети должны быть не более 500 символов')
    .nullable(),
  description: string()
    .min(3, 'Описание должно быть не менее 3 символов')
    .max(1500, 'Описание должно быть не более 1500 символов')
    .nullable(),
  orderPlatformId: number()
    .max(999999, 'orderPlatformId должно быть не более 999999')
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .nullable()
})

export type PostContact = InferType<typeof PostContactSchema>

export interface GetContact {
  id: number
  fio: string
  mobileNumber: string
  socials: string
  description: string
  orderPlatformId: number
  isDeleted?: boolean
  isMock?: boolean
  orderPlatform?: GetOrderPlatform
}
