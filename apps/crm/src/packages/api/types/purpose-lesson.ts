import { object, string, type InferType } from 'yup'

export const PostPurposeLessonSchema = object({
  title: string()
    .min(3, 'Название цели должно быть не менее 3 символов')
    .max(50, 'Название цели должно быть не более 50 символов')
    .required('Это поле обязательное')
})

export type PostPurposeLesson = InferType<typeof PostPurposeLessonSchema>

export interface GetPurposeLesson {
  id: number
  title: string
  isDeleted?: boolean
  isMock?: boolean
}
