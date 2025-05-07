import { object, string, type InferType } from 'yup'

export const PostOrderPlatformSchema = object({
  title: string()
    .min(3, 'Название платформы должно быть не менее 3 символов')
    .max(50, 'Название платформы должно быть не более 50 символов')
    .required('Это поле обязательное')
})

export type PostOrderPlatform = InferType<typeof PostOrderPlatformSchema>

export interface GetOrderPlatform {
  id: number
  title: string
  isDeleted?: boolean
  isMock?: boolean
}
