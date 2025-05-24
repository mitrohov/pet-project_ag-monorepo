import { ApiProperty } from '@nestjs/swagger'
import { EventCategory } from '../../dtos'

export class EventCategoryForSwagger extends EventCategory {
  @ApiProperty({ example: 'Домашние дела' })
  declare title: string

  @ApiProperty({ example: 1 })
  declare colorId?: number

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean

  @ApiProperty({ example: '2025-05-12T10:58:23.863Z' })
  declare createdAt?: string
}

export class EventCategoryWithIdForSwagger extends EventCategoryForSwagger {
  @ApiProperty({ example: 1 })
  declare id: number
}
