import { IsBoolean, IsOptional } from 'class-validator'
import { GetStudentResponseDto } from './get-student.dto'

export class DeleteStudentResponseDto extends GetStudentResponseDto {
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean
}
