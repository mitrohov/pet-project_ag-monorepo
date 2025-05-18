import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ColumnTaskDto {
  @IsString()
  @MaxLength(200)
  @ApiProperty({ example: 'Монтаж ролика' })
  title: string

  @IsString()
  @MaxLength(10000)
  @ApiProperty({ example: 'Тут подробное описание' })
  @IsOptional()
  description?: string

  @IsNumber()
  @ApiProperty({ example: 1 })
  boardColumnId?: number

  @IsNumber()
  @ApiProperty({ example: 1 })
  columnTaskStatusId?: number
}

export class ColumnTaskResponseDto extends ColumnTaskDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number
}

export class UpdateColumnTaskBodyDto extends ColumnTaskDto {}

export class CreateColumnTaskBodyDto extends ColumnTaskDto {
  @IsBoolean()
  @IsOptional()
  isMock?: boolean
}

export class DeleteColumnTaskResponseDto extends ColumnTaskResponseDto {
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean
}
