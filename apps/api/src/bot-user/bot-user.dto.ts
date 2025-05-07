import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class BotUserDto {
  @IsString()
  @ApiProperty({ example: 'admin', enum: UserRole })
  role: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty({ example: 'ivanov' })
  userName: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  chatId?: number | null;

  @IsNumber()
  @ApiProperty({ example: 1 })
  studentId: number;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
  isMock?: boolean;
}

export class BotUserResponseDto extends BotUserDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}

export class UpdateBotUserBodyDto extends BotUserDto {}

export class CreateBotUserBodyDto extends BotUserDto {}

export class DeleteBotUserResponseDto extends BotUserResponseDto {}
