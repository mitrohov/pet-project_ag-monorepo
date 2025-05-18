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
  IsNotEmpty,
} from "class-validator";
import { Transform } from "class-transformer";
import { StudentWithId } from "./student";

export class Lesson {
  @IsString()
  @MinLength(3, { message: "Название урока должно быть не менее 3 символов" })
  @MaxLength(50, { message: "Название урока должно быть не более 50 символов" })
  title: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  startTime: Date;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  endTime: Date;

  @IsString()
  @MaxLength(1000, { message: "Описание должно быть не более 1000 символов" })
  @IsOptional()
  description?: string;

  @IsBoolean()
  hasHomeWork: boolean;

  @IsBoolean()
  isMissed: boolean;

  @IsBoolean()
  isReschedule: boolean;

  @IsBoolean()
  isPreparationComplete: boolean;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @Min(1)
  @IsOptional()
  paymentId?: number;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @IsOptional()
  studentId: number;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @IsOptional()
  lessonsLeftToCompleteOnPayment?: number;

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

export class LessonWithId extends Lesson {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;
  student?: StudentWithId;
}

export class LessonAggregation extends LessonWithId {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  paymentLessonQty?: number;
}

export interface DatesForLesson {
  startTime: Date;
  endTime: Date;
}
