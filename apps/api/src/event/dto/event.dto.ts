import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

export class EventDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({ example: 'Съемка reals' })
  title: string

  @ApiProperty({ example: '2024-07-08T20:00:00.034Z' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  startTime: Date

  @ApiProperty({ example: '2024-07-08T21:00:00.034Z' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  endTime: Date

  @IsString()
  @MaxLength(1000)
  @ApiProperty({ example: 'Видео на тему времен' })
  @IsOptional()
  description: string

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  eventCategoryId?: number

  @IsBoolean()
  @IsOptional()
  isMock?: boolean

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean
}
