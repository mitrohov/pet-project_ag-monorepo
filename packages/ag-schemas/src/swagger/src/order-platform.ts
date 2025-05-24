import { ApiProperty } from '@nestjs/swagger'
import { OrderPlatform } from '../../dtos'

export class OrderPlatformForSwagger extends OrderPlatform {
  @ApiProperty({ example: 'Instagram' })
  declare title: string

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean

  @ApiProperty({ example: '2025-05-12T10:58:23.863Z' })
  declare createdAt?: string
}

export class OrderPlatformWithIdForSwagger extends OrderPlatformForSwagger {
  @ApiProperty({ example: 1 })
  declare id: number
}
