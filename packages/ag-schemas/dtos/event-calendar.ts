import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  MinLength,
  ValidateIf,
  IsNotEmpty,
  IsPositive,
} from "class-validator";
import { PaymentWithId } from "./payment";

export class CalendarItem {
  @IsString()
  @MaxLength(50, { message: "" })
  title: string;

  @IsString()
  @MaxLength(50, { message: "" })
  code: string;
}

export class ColorWithId extends CalendarItem {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;
}

export class CalendarItemTime {
  @IsString()
  @MinLength(3, { message: "Поле start должно быть не менее 3 символов" })
  @MaxLength(50, { message: "Поле start должно быть не более 50 символов" })
  start: string;

  @IsString()
  @MinLength(3, { message: "Поле end должно быть не менее 3 символов" })
  @MaxLength(50, { message: "Поле end должно быть не более 50 символов" })
  end: string;
}

export type CalendarItemType = "lesson" | "event";

export class EventDialogEmit {
  type: CalendarItemType;
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;
}

export class CalendarItemAggregation {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;

  @IsBoolean()
  isCustom: boolean;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  with: string;

  time: CalendarItemTime;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  eventCategoryId: number | null;

  colorScheme: ColorWithId;

  @IsBoolean()
  isEditable: boolean;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @IsOptional()
  studentId: number | null;

  @IsBoolean()
  @IsOptional()
  hasHomeWork: boolean | null;

  @IsBoolean()
  @IsOptional()
  isReschedule: boolean | null;

  @ValidateIf((_, value) => typeof value === "string")
  @IsString({ message: "Поле должно быть строкой или числом" })
  @ValidateIf((_, value) => typeof value === "number")
  @IsNumber({}, { message: "Поле должно быть строкой или числом" })
  @IsOptional()
  lessonsLeftToCompleteOnPayment: number | null | string;

  @IsBoolean()
  @IsOptional()
  isPreparationComplete: boolean | null;

  @IsOptional()
  payment: PaymentWithId | null;

  @IsBoolean()
  @IsOptional()
  isLesson: boolean;
}
