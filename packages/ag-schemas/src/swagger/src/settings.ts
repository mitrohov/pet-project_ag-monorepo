import { ApiProperty } from '@nestjs/swagger'
import { Settings } from '../../dtos'

export class SettingsForSwagger extends Settings {
  @ApiProperty({ example: 'hoursPerMonth' })
  declare field: string

  @ApiProperty({ example: '40' })
  declare value: string

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean

  @ApiProperty({ example: '2025-05-12T10:58:23.863Z' })
  declare createdAt?: string
}

export class SettingsWithIdForSwagger extends SettingsForSwagger {
  @ApiProperty({ example: 1 })
  declare id: number
}
