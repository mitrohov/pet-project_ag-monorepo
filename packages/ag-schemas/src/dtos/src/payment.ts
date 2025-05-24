import {
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsPositive,
} from 'class-validator'
import { Transform } from 'class-transformer'
import { LessonWithId } from './lesson'

export class Payment {
  @IsString()
  @MinLength(3, { message: 'Название оплаты должно быть не менее 3 символов' })
  @MaxLength(50, {
    message: 'Название оплаты должно быть не более 50 символов',
  })
  title: string

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  date: string

  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  @Min(1, { message: 'Количество уроков должно быть не менее 1' })
  @Max(30, { message: 'Количество уроков должно быть не более 50' })
  lessonQty: number

  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  @Min(500, { message: 'Сумма должна быть не менее 500' })
  @Max(50000, { message: 'Сумма должна быть не более 50000' })
  sum: number

  @IsBoolean()
  @IsOptional()
  isMessageSent: boolean

  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  @Min(1)
  @IsOptional()
  studentId?: number

  @IsBoolean()
  @IsOptional()
  isMock?: boolean

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean
}

export class PaymentWithId extends Payment {
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  id: number

  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  qtyLessonsLeft: number
}

export class PaymentAggregation extends PaymentWithId {
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  @IsOptional()
  lessons: LessonWithId[]
}
