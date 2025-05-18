import { BoardColumnWithId } from "./board-column";
import {
  MinLength,
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsArray,
} from "class-validator";

export class Board {
  @IsString()
  @MinLength(3, { message: "Название доски должно быть не менее 3 символов" })
  @MaxLength(200, {
    message: "Название доски должно быть не более 200 символов",
  })
  title: string;

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

export class BoardWithId extends Board {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;
}

export class BoardAggregation extends BoardWithId {
  @IsArray()
  boardColumns: BoardColumnWithId[];
}

export interface BoardDragStartParams {
  columnId: number;
  taskId: number;
}
