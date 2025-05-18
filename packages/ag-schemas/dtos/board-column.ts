import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsArray,
  MinLength,
} from 'class-validator'
import { ColumnTaskWithId } from './column-task'

export class BoardColumn {
  @IsString()
  @MinLength(3, { message: 'Название колонки должно быть не менее 3 символов' })
  @MaxLength(200, {
    message: 'Название колонки должно быть не более 200 символов',
  })
  title: string

  @IsNumber()
  @IsInt()
  @IsPositive()
  boardId: number

  @IsNumber()
  @IsInt()
  @IsPositive()
  sortIndex: number

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

export class BoardColumnWithId extends BoardColumn {
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  id: number
}

export class BoardColumnAggregation extends BoardColumnWithId {
  @IsArray()
  columnTasks: ColumnTaskWithId[]
}
