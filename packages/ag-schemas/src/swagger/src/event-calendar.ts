import { ApiProperty } from '@nestjs/swagger'
import { PaymentWithId } from '../../dtos/src/payment'
import { CalendarItem, CalendarItemAggregation } from '../../dtos'
import { ColorWithId, CalendarItemTime } from '../../dtos'

export class CalendarItemForSwagger extends CalendarItem {
  @ApiProperty({ example: 'Синий' })
  declare title: string

  @ApiProperty({ example: 'Blue' })
  declare code: string
}

export class CalendarItemAggregationForSwagger extends CalendarItemAggregation {
  declare id: number

  declare isCustom: boolean

  declare title: string

  declare with: string

  declare time: CalendarItemTime

  declare eventCategoryId: number | null

  declare colorScheme: ColorWithId

  declare isEditable: boolean

  declare description: string

  declare studentId: number | null

  declare hasHomeWork: boolean | null

  declare isReschedule: boolean | null

  declare lessonsLeftToCompleteOnPayment: number | null | string

  declare isPreparationComplete: boolean | null

  declare payment: PaymentWithId | null

  declare isLesson: boolean
}
