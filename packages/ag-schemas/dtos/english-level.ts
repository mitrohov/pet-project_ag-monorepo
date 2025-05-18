import {
  MinLength,
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  IsPositive,
  IsNotEmpty,
} from 'class-validator'

export class EnglishLevel {
  @IsString()
  @MinLength(3, {
    message: 'Уровень английского должен быть не менее 1 символа',
  })
  @MaxLength(50, {
    message: 'Уровень английского должен быть не более 50 символов',
  })
  title: string

  @IsBoolean()
  @IsOptional()
  isMock?: boolean

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  createdAt?: string
}

export class EnglishLevelWithId extends EnglishLevel {
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  id: number
}
