import { object, string, number, type InferType } from 'yup'
import type { GetBoardColumn } from './board-column'
import type { GetColumnTaskStatus } from './column-task-status'

export const PostColumnTaskSchema = object({
  title: string()
    .min(3, 'Заголовок задачи должен быть не менее 3 символов')
    .max(50, 'Заголовок задачи должен быть не более 50 символов')
    .required('Это поле обязательное'),
  description: string().optional(),
  boardColumnId: number().required('Это поле обязательное'),
  columnTaskStatusId: number().required('Это поле обязательное')
})

export type PostColumnTask = InferType<typeof PostColumnTaskSchema>

export interface DragTask {
  columnId: number
  taskId: number
}

export interface GetColumnTask {
  id: number
  title: string
  description: string
  boardColumnId: number
  boardColumn: GetBoardColumn
  columnTaskStatusId: number
  columnTaskStatus?: GetColumnTaskStatus
}
