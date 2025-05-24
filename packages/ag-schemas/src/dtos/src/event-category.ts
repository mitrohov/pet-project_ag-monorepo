import {
  MinLength,
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
  IsPositive,
  IsNotEmpty,
} from 'class-validator'
import { ColorWithId } from './color'

export class EventCategory {
  @IsString()
  @MinLength(3, { message: 'Название должно быть не более 3 символов' })
  @MaxLength(50, { message: 'Название должно быть не более 50 символов' })
  title: string

  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  @Min(1)
  @IsOptional()
  colorId?: number

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

export class EventCategoryWithId extends EventCategory {
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  id: number
}

export class EventCategoryAggregation extends EventCategoryWithId {
  color: ColorWithId
}
