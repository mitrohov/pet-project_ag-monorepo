import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PaymentDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ example: 'Оплата за февраль' })
  title: string;

  @ApiProperty({ example: '2024-07-08T20:35:32.034Z' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  date: string;

  @IsNumber()
  @Min(1)
  @Max(30)
  @ApiProperty({ example: 30 })
  lessonQty: number;

  @IsNumber()
  @Min(500)
  @Max(50000)
  @ApiProperty({ example: 6000 })
  sum: number;

  @IsBoolean()
  @ApiProperty({ example: false })
  @IsOptional()
  isMessageSent: boolean;

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  studentId?: number;

  @IsBoolean()
  @IsOptional()
  isMock?: boolean;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
