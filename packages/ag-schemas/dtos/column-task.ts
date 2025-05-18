import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
  IsPositive,
  MinLength,
  IsNotEmpty,
} from "class-validator";
import { BoardColumnAggregation } from "./board-column";
import { ColumnTaskStatusAggregation } from "./column-task-status";

export class ColumnTask {
  @IsString()
  @MinLength(3, { message: "Заголовок задачи должен быть не менее 3 символов" })
  @MaxLength(200, {
    message: "Заголовок задачи должен быть не более 200 символов",
  })
  title: string;

  @IsString()
  @MinLength(3, { message: "Описание задачи должно быть не менее 3 символов" })
  @MaxLength(1000, {
    message: "Описание задачи задачи быть не более 1000 символов",
  })
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @Min(1)
  boardColumnId?: number;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @Min(1)
  columnTaskStatusId?: number;

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

export class ColumnTaskWithId extends ColumnTask {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;
}

export class ColumnTaskAggregation extends ColumnTask {
  boardColumn: BoardColumnAggregation;

  @IsOptional()
  columnTaskStatus: ColumnTaskStatusAggregation;
}

export interface ColumnTaskDragStartParams {
  columnId: number;
  taskId: number;
}
