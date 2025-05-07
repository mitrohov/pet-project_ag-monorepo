import { IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class StudentScheduleDto {
  @IsNumber()
  @ApiProperty({ example: 3 })
  @IsOptional()
  dayWeek: number;

  @ApiProperty({ example: '2024-07-08T21:00:00.034Z' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  time: Date;

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  studentId?: number;
}

export class StudentScheduleResponseDto extends StudentScheduleDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}

export class UpdateStudentScheduleBodyDto extends StudentScheduleDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  id?: number;
}

export class CreateStudentScheduleBodyDto extends StudentScheduleDto {
  @IsBoolean()
  @IsOptional()
  isMock?: boolean;
}

export class DeleteStudentScheduleResponseDto extends StudentScheduleResponseDto {
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
