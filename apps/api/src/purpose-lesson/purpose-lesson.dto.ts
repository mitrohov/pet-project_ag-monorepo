import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PurposeLessonDto {
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Английский для работы' })
  title: string
}

export class PurposeGetLessonResponseDto extends PurposeLessonDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number
}

export class UpdatePurposeLessonBodyDto extends PurposeLessonDto {}

export class CreatePurposeLessonBodyDto extends PurposeLessonDto {
  @IsBoolean()
  @IsOptional()
  isMock?: boolean
}

export class DeletePurposeGetLessonResponseDto extends PurposeGetLessonResponseDto {
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean
}
