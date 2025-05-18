import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ColumnTaskStatusDto {
  @IsString()
  @MaxLength(200)
  @ApiProperty({ example: 'В работе' })
  title: string

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  colorId?: number
}

export class ColumnTaskStatusResponseDto extends ColumnTaskStatusDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number
}

export class UpdateColumnTaskStatusBodyDto extends ColumnTaskStatusDto {}

export class CreateColumnTaskStatusBodyDto extends ColumnTaskStatusDto {
  @IsBoolean()
  @IsOptional()
  isMock?: boolean
}

export class DeleteColumnTaskStatusResponseDto extends ColumnTaskStatusResponseDto {
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean
}
