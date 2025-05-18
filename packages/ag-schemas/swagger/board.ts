import { ApiProperty } from '@nestjs/swagger'
import { Board, BoardWithId } from '../dtos/board'

export class BoardForSwagger extends Board {
  @ApiProperty({ example: 'Планы по видео' })
  declare title: string

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean

  @ApiProperty({ example: '2025-05-12T10:58:23.863Z' })
  declare createdAt?: string
}

export class BoardWithIdForSwagger extends BoardWithId {
  @ApiProperty({ example: 1 })
  declare id: number
}
