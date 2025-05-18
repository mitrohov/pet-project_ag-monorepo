import { ApiProperty } from '@nestjs/swagger'
import { Event, EventAggregationWithId } from '../dtos/event'

export class EventForSwagger extends Event {
  @ApiProperty({ example: 'Съемка reals' })
  declare title: string

  @ApiProperty({ example: '2024-07-08T20:00:00.034Z' })
  declare startTime: Date

  @ApiProperty({ example: '2024-07-08T21:00:00.034Z' })
  declare endTime: Date

  @ApiProperty({ example: 'Видео на тему времен' })
  declare description: string

  @ApiProperty({ example: 1 })
  declare eventCategoryId?: number

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean

  @ApiProperty({ example: '2025-05-12T10:58:23.863Z' })
  declare createdAt?: string
}

export class EventAggregationWithIdForSwagger extends EventAggregationWithId {
  @ApiProperty({ example: 1 })
  declare id: number
}
