import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentDto } from './payment.dto';
import { GetLessonResponseDto } from '../../lesson/dto';

export class PaymentAggregationResponseDto extends PaymentDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;

  @IsNumber()
  @ApiProperty({ example: 1 })
  qtyLessonsLeft: number;

  @IsNumber()
  @ApiProperty({
    example: {
      title: 'Урок с Анищенко',
      startTime: '2024-07-08T20:00:00.034Z',
      endTime: '2024-07-08T21:00:00.034Z',
      description: 'Нужно подготовить видео обзор',
      hasHomeWork: true,
      isMissed: true,
      isReschedule: true,
      isPreparationComplete: true,
      paymentId: 1,
      studentId: 1,
    },
  })
  @IsOptional()
  lessons: GetLessonResponseDto[];

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  student: GetLessonResponseDto[];
}
