import {
  MinLength,
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnglishLevelDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ example: 'C1' })
  title: string;

  @IsBoolean()
  @IsOptional()
  isMock?: boolean;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}

export class EnglishLevelResponseDto extends EnglishLevelDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}

export class UpdateEnglishLevelBodyDto extends EnglishLevelDto {}

export class CreateEnglishLevelBodyDto extends EnglishLevelDto {}

export class DeleteEnglishLevelResponseDto extends EnglishLevelResponseDto {}
