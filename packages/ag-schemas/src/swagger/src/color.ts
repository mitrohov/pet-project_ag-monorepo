import { ApiProperty } from '@nestjs/swagger'
import { Color } from '../../dtos'

export class ColorForSwagger extends Color {
  @ApiProperty({ example: 'Индийский красный' })
  declare title: string

  @ApiProperty({ example: 'indianRed' })
  declare code: string

  @ApiProperty({ example: '#000000' })
  declare color: string

  @ApiProperty({ example: '#CD5C5C' })
  declare backgroundColor: string

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean

  @ApiProperty({ example: '2025-05-12T10:58:23.863Z' })
  declare createdAt?: string
}

export class ColorWithIdForSwagger extends ColorForSwagger {
  @ApiProperty({ example: 1 })
  declare id: number
}
