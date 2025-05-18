import {
  IsString,
  IsNumber,
  IsInt,
  IsNotEmpty,
  IsPositive,
} from 'class-validator'

export class DayWeek {
  @IsString()
  @IsNotEmpty()
  label: string

  @IsString()
  @IsNotEmpty()
  shortLabel: string

  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  day: number
}
