import { ApiProperty } from '@nestjs/swagger'
import { ColumnTaskStatus } from '../../dtos'

export class ColumnTaskStatusForSwagger extends ColumnTaskStatus {
  @ApiProperty({ example: 'В работе' })
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

export class ColumnTaskStatusWithIdForSwagger extends ColumnTaskStatusForSwagger {
  @ApiProperty({ example: 1 })
  declare id: number
}
