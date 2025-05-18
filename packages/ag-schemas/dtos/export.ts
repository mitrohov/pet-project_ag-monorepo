import { IsString, IsOptional, IsNotEmpty } from 'class-validator'

export class ExportWordDocQuery {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  startTime: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  endTime: string
}
