import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class SettingsDto {
  @IsString()
  @ApiProperty({ example: 'hoursPerMonth' })
  field: string;

  @IsString()
  @ApiProperty({ example: '40' })
  value: string;
}

export class SettingsResponseDto extends SettingsDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}

export class UpdateSettingsBodyDto extends SettingsDto {}

export class CreateSettingsBodyDto extends SettingsDto {
  @IsBoolean()
  @IsOptional()
  isMock?: boolean;
}

export class DeleteSettingsResponseDto extends SettingsResponseDto {
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
