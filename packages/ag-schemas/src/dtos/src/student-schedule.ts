import {
  IsNumber,
  IsBoolean,
  IsOptional,
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  Min,
  IsPositive,
  IsNotEmpty,
} from 'class-validator'
import { Transform } from 'class-transformer'

export class StudentSchedule {
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  @MinLength(1, { message: 'День недели должен быть не менее 1' })
  @MaxLength(7, { message: 'День недели должен быть не более 7' })
  @IsOptional()
  dayWeek: number

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  time: Date

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

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  createdAt?: string
}

export class StudentScheduleWithId extends StudentSchedule {
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  id: number
}
