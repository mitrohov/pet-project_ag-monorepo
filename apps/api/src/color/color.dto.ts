import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ColorDto {
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Индийский красный' })
  title: string

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'indianRed' })
  code: string

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: '#000000' })
  color: string

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: '#CD5C5C' })
  backgroundColor: string

  @IsBoolean()
  @IsOptional()
  isMock?: boolean

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean
}

export class ColorResponseDto extends ColorDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number
}

export class UpdateColorBodyDto extends ColorDto {}

export class CreateColorBodyDto extends ColorDto {}

export class DeleteColorResponseDto extends ColorResponseDto {}
