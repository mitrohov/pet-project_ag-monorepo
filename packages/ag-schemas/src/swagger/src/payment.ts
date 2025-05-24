import { ApiProperty } from '@nestjs/swagger'
import { Payment } from '../../dtos/src/payment'

export class PaymentForSwagger extends Payment {
  @ApiProperty({ example: 'Оплата за февраль' })
  declare title: string

  @ApiProperty({ example: '2024-07-08T20:35:32.034Z' })
  declare date: string

  @ApiProperty({ example: 30 })
  declare lessonQty: number

  @ApiProperty({ example: 6000 })
  declare sum: number

  @ApiProperty({ example: false })
  declare isMessageSent: boolean

  @ApiProperty({ example: 1 })
  declare studentId?: number

  @ApiProperty({ example: false })
  declare isMock?: boolean

  @ApiProperty({ example: false })
  declare isDeleted?: boolean
}

export class PaymentWithIdForSwagger extends PaymentForSwagger {
  @ApiProperty({ example: 1 })
  declare id: number

  @ApiProperty({ example: 1 })
  declare qtyLessonsLeft: number
}
