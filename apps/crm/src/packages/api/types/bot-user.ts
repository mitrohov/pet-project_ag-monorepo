import { object, string, number, boolean,type InferType } from 'yup'

export const PostBotUserSchema = object({
  userName: string()
    .min(3, 'TG user name должно быть не менее 3 символов')
    .max(100, 'TG user name должно быть не более 100 символов')
    .required('Это поле обязательное'),
  role: string()
    .oneOf(['user', 'admin'], 'Роль должна быть либо "user", либо "admin"')
    .min(4, 'Роль должна быть не менее 4 символов')
    .max(5, 'Роль должна быть не более 5 символов')
    .required('Это поле обязательное'),
  chatId: number()
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .nullable(),
  studentId: number()
    .max(999999, 'studentId должно быть не более 999999')
    .positive('Значение должно быть положительным числом')
    .integer('Значение должно быть целым числом')
    .required('Это поле обязательное'),
  isActive: boolean().required('Это поле обязательное')
})

export type PostBotUser = InferType<typeof PostBotUserSchema>

export interface GetBotUser {
  id: number
  role: string
  userName: string
  chatId: number
  studentId: number
  isActive: boolean
  isDeleted?: boolean
  isMock?: boolean
}
