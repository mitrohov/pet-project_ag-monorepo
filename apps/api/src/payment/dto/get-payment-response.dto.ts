import { IsNumber, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaymentDto } from './payment.dto'
import { GetLessonResponseDto } from '../../lesson/dto'

export class GetPaymentResponseDto extends PaymentDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number

  @IsNumber()
  @ApiProperty({ example: 1 })
  qtyLessonsLeft: number

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  lessons: GetLessonResponseDto[]
}
