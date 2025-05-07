import type { Color, GetPayment } from '@/packages/api/types'

export interface CalendarItemTime {
  start: string
  end: string
}

export type CalendarItemType = 'lesson' | 'event'

export interface EventDialogEmit {
  type: CalendarItemType
  id: number
}

export interface CalendarItem {
  id: number
  isCustom: boolean
  title: string
  with: string
  time: CalendarItemTime
  eventCategoryId: number | null
  colorScheme: Color
  isEditable: boolean
  description: string
  studentId: number | null
  hasHomeWork: boolean | null
  isReschedule: boolean | null
  lessonsLeftToCompleteOnPayment: number | null | string
  isPreparationComplete: boolean | null
  payment: GetPayment | null
  isLesson: boolean
}
