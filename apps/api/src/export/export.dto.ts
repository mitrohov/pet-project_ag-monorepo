import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExportQueryDto {
  @IsString()
  @IsOptional()
  tableName: string;
}

export class ExportWordDocQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: '2024-11-13T00:00:00.621Z' })
  startTime: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '2024-11-20T00:00:00.621Z' })
  endTime: string;
}
