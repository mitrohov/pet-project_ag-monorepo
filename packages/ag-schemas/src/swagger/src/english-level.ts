import { ApiProperty } from '@nestjs/swagger'
import { EnglishLevel } from '../../dtos'

export class EnglishLevelForSwagger extends EnglishLevel {
  @ApiProperty({ example: 'C1' })
  declare title: string

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean

  @ApiProperty({ example: '2025-05-12T10:58:23.863Z' })
  declare createdAt?: string
}

export class EnglishLevelWithIdForSwagger extends EnglishLevelForSwagger {
  @ApiProperty({ example: 1 })
  declare id: number
}
