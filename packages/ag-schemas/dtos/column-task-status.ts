import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  IsNotEmpty,
  Min,
  IsPositive,
  MinLength,
  IsArray,
} from "class-validator";
import { ColumnTaskAggregation } from "./column-task";
import { ColorWithId } from "./color";

export class ColumnTaskStatus {
  @IsString()
  @MinLength(3, { message: "Название статуса должно быть не менее 3 символов" })
  @MaxLength(200, {
    message: "Название статуса должно быть не более 200 символов",
  })
  title: string;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @Min(1)
  @IsOptional()
  colorId?: number;

  @IsBoolean()
  @IsOptional()
  isMock?: boolean;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  createdAt?: string;
}

export class ColumnTaskStatusWithId extends ColumnTaskStatus {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;
}

export class ColumnTaskStatusAggregation extends ColumnTaskStatusWithId {
  @IsArray()
  columnTasks: ColumnTaskAggregation;

  color: ColorWithId;
}
