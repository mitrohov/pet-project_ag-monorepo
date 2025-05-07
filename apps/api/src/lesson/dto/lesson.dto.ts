import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class LessonDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ example: 'Урок с Анищенко' })
  title: string;

  @ApiProperty({ example: '2024-07-08T20:00:00.034Z' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  startTime: Date;

  @ApiProperty({ example: '2024-07-08T21:00:00.034Z' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  endTime: Date;

  @IsString()
  @MaxLength(1000)
  @ApiProperty({ example: 'Нужно подготовить видео обзор' })
  @IsOptional()
  description?: string;

  @IsBoolean()
  @ApiProperty({ example: false })
  hasHomeWork: boolean;

  @IsBoolean()
  @ApiProperty({ example: false })
  isMissed: boolean;

  @IsBoolean()
  @ApiProperty({ example: false })
  isReschedule: boolean;

  @IsBoolean()
  @ApiProperty({ example: false })
  isPreparationComplete: boolean;

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  paymentId?: number;

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  studentId: number;

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  lessonsLeftToCompleteOnPayment?: number;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @IsBoolean()
  @IsOptional()
  isMock?: boolean;
}
