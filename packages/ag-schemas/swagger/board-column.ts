import { ApiProperty } from '@nestjs/swagger'
import { BoardColumn, BoardColumnWithId } from '../dtos/board-column'

export class BoardColumnForSwagger extends BoardColumn {
  @ApiProperty({ example: 'Backlog' })
  declare title: string

  declare boardId: number

  declare sortIndex: number

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean

  @ApiProperty({ example: '2025-05-12T10:58:23.863Z' })
  declare createdAt?: string
}

export class BoardColumnWithIdForSwagger extends BoardColumnWithId {
  @ApiProperty({ example: 1 })
  declare id: number
}
