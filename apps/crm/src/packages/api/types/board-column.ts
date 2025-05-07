import { object, string, number, type InferType } from 'yup'
import type { GetColumnTask } from './column-task'

export const PostBoardColumnSchema = object({
  title: string()
    .min(3, 'Название колонки должно быть не менее 3 символов')
    .max(50, 'Название колонки должно быть не более 50 символов')
    .required('Это поле обязательное'),
  boardId: number().required('Поле boardId обязательное')
})

export type PostBoardColumn = InferType<typeof PostBoardColumnSchema>

export interface GetBoardColumn {
  id: number
  title: string
  boardId: number
  columnTasks: GetColumnTask[]
}
