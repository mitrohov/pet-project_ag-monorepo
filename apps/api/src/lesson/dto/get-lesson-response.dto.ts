import { LessonDto } from './lesson.dto'
import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { GetStudentResponseDto } from '../../student/dto/get-student.dto'

export class GetLessonResponseDto extends LessonDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number
  student?: GetStudentResponseDto

  @IsNumber()
  @ApiProperty({ example: 1 })
  paymentLessonQty?: number
}
