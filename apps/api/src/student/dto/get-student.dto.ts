import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StudentDto } from './student.dto';
import { GetLessonResponseDto } from '../../lesson/dto';
import { ColorResponseDto } from '../../color/color.dto';
import { GetPaymentResponseDto } from '../../payment/dto/get-payment-response.dto';

export class GetStudentResponseDto extends StudentDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  paymentAmountPerMonth?: number;
  lessons?: GetLessonResponseDto[];
  color?: ColorResponseDto;
  payments?: GetPaymentResponseDto[];
}
