import {
  MinLength,
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ColorResponseDto } from '../color/color.dto';

export class EventCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ example: 'Домашние дела' })
  title: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  colorId?: number;

  @IsBoolean()
  @IsOptional()
  isMock?: boolean;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}

export class EventCategoryResponseDto extends EventCategoryDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
  color?: ColorResponseDto;
}

export class UpdateEventCategoryBodyDto extends EventCategoryDto {}

export class CreateEventCategoryBodyDto extends EventCategoryDto {}

export class DeleteEventCategoryResponseDto extends EventCategoryResponseDto {}
