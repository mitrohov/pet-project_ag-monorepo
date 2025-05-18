import { CalendarItemTimeDto } from './calendar-item-time-dto'
import { CalendarItemColor } from './calendar-item-color'

export interface CalendarItemResponseDto {
  id: number
  isCustom: boolean
  title: string
  with: string
  time: CalendarItemTimeDto
  eventCategoryId: number | null
  colorScheme: CalendarItemColor
  isEditable: boolean
  description: string
  studentId: number | null
  hasHomeWork: boolean | null
  isReschedule: boolean | null
  lessonsLeftToCompleteOnPayment: number | string | null
  isPreparationComplete: boolean | null
  isLesson: boolean
}
