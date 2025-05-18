import {
  MaxLength,
  MinLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ContactDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @ApiProperty({ example: 'Иванов Иван Иванович' })
  fio: string

  @IsString()
  @MaxLength(30)
  @MinLength(3)
  @ApiProperty({ example: '8 (999) 123-22-44' })
  @IsOptional()
  mobileNumber: string

  @IsString()
  @MaxLength(500)
  @MinLength(3)
  @ApiProperty({ example: 'Instagram - @ivanov.' })
  @IsOptional()
  socials: string

  @IsString()
  @MaxLength(1500)
  @MinLength(3)
  @ApiProperty({ example: 'Может начать заниматься после сентября.' })
  @IsOptional()
  description: string

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  orderPlatformId: number

  @IsBoolean()
  @IsOptional()
  isMock?: boolean

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean
}

export class ContactResponseDto extends ContactDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number
}

export class UpdateContactBodyDto extends ContactDto {}

export class CreateContactBodyDto extends ContactDto {}

export class DeleteContactResponseDto extends ContactResponseDto {}
