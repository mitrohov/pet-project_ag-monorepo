import { object, string, type InferType } from 'yup'

export const PostEnglishLevelSchema = object({
  title: string()
    .min(1, 'Уровень английского должен быть не менее 1 символа')
    .max(50, 'Уровень английского должен быть не более 50 символов')
    .required('Это поле обязательное')
})

export type PostEnglishLevel = InferType<typeof PostEnglishLevelSchema>

export interface GetEnglishLevel {
  id: number
  title: string
  isDeleted?: boolean
  isMock?: boolean
}
