import { object, string, type InferType } from 'yup'
import type { GetBoardColumn } from './board-column'

export const PostBoardSchema = object({
  title: string()
    .min(3, 'Название доски должно быть не менее 3 символов')
    .max(100, 'Название доски должно быть не более 100 символов')
    .required('Это поле обязательное')
})

export type PostBoard = InferType<typeof PostBoardSchema>

export interface GetBoard {
  id: number
  title: string
  boardColumns?: GetBoardColumn[]
}

export interface BoardDragStart {
  columnId: number
  taskId: number
}
