import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
  IsObject,
  IsNotEmpty,
} from "class-validator";
import { Transform } from "class-transformer";
import { EventCategoryWithId } from "./event-category";

export class Event {
  @IsString()
  @MinLength(3, { message: "Название события должно быть не менее 3 символов" })
  @MaxLength(100, {
    message: "Название события должно быть не более 100 символов",
  })
  title: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  startTime: Date;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  endTime: Date;

  @IsString()
  @MaxLength(1000, { message: "Описание должно быть не более 1000 символов" })
  @IsOptional()
  description: string;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @Min(1)
  @IsOptional()
  eventCategoryId?: number;

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

export class EventAggregationWithId extends Event {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;
}

export class EventAggregation extends EventAggregationWithId {
  @IsObject()
  @IsOptional()
  eventCategory?: EventCategoryWithId;
}
