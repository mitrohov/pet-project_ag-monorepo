import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BoardColumnDto {
  @IsString()
  @MaxLength(100)
  @ApiProperty({ example: 'Backlog' })
  title: string;
}

export class BoardColumnResponseDto extends BoardColumnDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}

export class UpdateBoardColumnBodyDto extends BoardColumnDto {}

export class CreateBoardColumnBodyDto extends BoardColumnDto {
  @IsBoolean()
  @IsOptional()
  isMock?: boolean;
}

export class DeleteBoardColumnResponseDto extends BoardColumnResponseDto {
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
