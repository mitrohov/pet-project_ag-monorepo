import { IsOptional, IsString } from 'class-validator';

export class StudentQueryFiltersDto {
  @IsString()
  @IsOptional()
  fio: string;

  @IsString()
  @IsOptional()
  lessonTime: string;

  @IsString()
  @IsOptional()
  lessonCost: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  qtyLessonsPerWeek: number;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  englishLevelId: number;

  @IsString()
  @IsOptional()
  purposeLessonId: number;

  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  rows: string;
}
