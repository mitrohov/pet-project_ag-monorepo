import { ApiProperty } from '@nestjs/swagger'
import { ColumnTask } from '../../dtos'

export class ColumnTaskForSwagger extends ColumnTask {
  @ApiProperty({ example: 'Монтаж ролика' })
  declare title: string

  @ApiProperty({ example: 'Тут подробное описание' })
  declare description?: string

  @ApiProperty({ example: 1 })
  declare boardColumnId?: number

  @ApiProperty({ example: 1 })
  declare columnTaskStatusId?: number

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean

  @ApiProperty({ example: '2025-05-12T10:58:23.863Z' })
  declare createdAt?: string
}

export class ColumnTaskWithIdForSwagger extends ColumnTaskForSwagger {
  @ApiProperty({ example: 1 })
  declare id: number
}
