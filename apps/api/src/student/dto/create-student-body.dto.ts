import { IsBoolean, IsOptional } from 'class-validator';
import { StudentDto } from './student.dto';

export class CreateStudentBodyDto extends StudentDto {
  @IsBoolean()
  @IsOptional()
  isMock?: boolean;
}
