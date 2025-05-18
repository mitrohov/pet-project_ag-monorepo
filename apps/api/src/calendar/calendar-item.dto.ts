import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CalendarItemDto {
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Синий' })
  title: string

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Blue' })
  code: string
}

export class ColorResponseDto extends CalendarItemDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number
}

export class UpdateColorBodyDto extends CalendarItemDto {}

export class CreateColorBodyDto extends CalendarItemDto {
  @IsBoolean()
  @IsOptional()
  isMock?: boolean
}

export class DeleteColorResponseDto extends ColorResponseDto {
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean
}
