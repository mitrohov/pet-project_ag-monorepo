import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  MinLength,
  IsPositive,
  IsNotEmpty,
} from 'class-validator'

export class PurposeLesson {
  @IsString()
  @MinLength(3, { message: 'Название цели должно быть не менее 3 символов' })
  @MaxLength(50, { message: 'Название цели должно быть не более 50 символов' })
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

export class PurposeLessonWithId extends PurposeLesson {
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  id: number
}
