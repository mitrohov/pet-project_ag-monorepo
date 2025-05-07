import {
  MinLength,
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderPlatformDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ example: 'Instagram' })
  title: string;

  @IsBoolean()
  @IsOptional()
  isMock?: boolean;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}

export class OrderPlatformResponseDto extends OrderPlatformDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}

export class UpdateOrderPlatformBodyDto extends OrderPlatformDto {}

export class CreateOrderPlatformBodyDto extends OrderPlatformDto {}

export class DeleteOrderPlatformResponseDto extends OrderPlatformResponseDto {}
