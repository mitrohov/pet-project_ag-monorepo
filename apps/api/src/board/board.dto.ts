import { ApiProperty } from '@nestjs/swagger';
import { ColumnTaskResponseDto } from '../column-task/column-task.dto';
import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class BoardDto {
  @IsString()
  @MaxLength(100)
  @ApiProperty({ example: 'Планы по видео' })
  title: string;
  columnTasks?: ColumnTaskResponseDto[];
}

export class BoardResponseDto extends BoardDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}

export class UpdateBoardBodyDto extends BoardDto {}

export class CreateBoardBodyDto extends BoardDto {
  @IsBoolean()
  @IsOptional()
  isMock?: boolean;
}

export class DeleteBoardResponseDto extends BoardResponseDto {
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
