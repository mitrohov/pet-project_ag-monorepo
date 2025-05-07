import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudentDto {
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Иванов Иван Иванович' })
  fio: string;

  @IsNumber()
  @ApiProperty({ example: '1' })
  @Min(30)
  @Max(90)
  lessonTime: number;

  @IsNumber()
  @Min(500)
  @Max(3000)
  @ApiProperty({ example: 1500 })
  lessonCost: number;

  @IsString()
  @ApiProperty({ example: 'Необходимое описание ученика' })
  @MaxLength(1500)
  @IsOptional()
  description: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  @ApiProperty({ example: 2 })
  qtyLessonsPerWeek: number;

  @IsString()
  @MaxLength(30)
  @ApiProperty({ example: '8 (999) 999-99-99' })
  @IsOptional()
  phone: string;

  @IsString()
  @MaxLength(1000)
  @ApiProperty({ example: 'Instagram - @ivanov, Telegram - @ivanov' })
  social: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Ivan' })
  @IsOptional()
  progressMeLogin: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'dkh388n!' })
  @IsOptional()
  progressMePassword: string;

  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 1 })
  @IsOptional()
  englishLevelId?: number;

  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 1 })
  @IsOptional()
  purposeLessonId?: number;

  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 1 })
  @IsOptional()
  colorId?: number;
}
