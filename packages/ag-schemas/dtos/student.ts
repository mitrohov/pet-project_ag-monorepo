import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { LessonWithId } from "./lesson";
import { ColorWithId } from "./color";
import { PaymentWithId } from "./payment";
import { StudentScheduleWithId } from "./student-schedule";
import { PurposeLessonWithId } from "./purpose-lesson";
import { EnglishLevelWithId } from "./english-level";

export class Student {
  @IsString()
  @MinLength(3, {
    message: "Кол-во занятий в неделю должно быть не менее 3 символов",
  })
  @MaxLength(50, {
    message: "Кол-во занятий в неделю должно быть не более 20 символов",
  })
  fio: string;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @Min(30, { message: "Время урока должно быть не менее 30" })
  @Max(90, { message: "Время урока должно быть не более 90" })
  lessonTime: number;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @Min(500, { message: "Стоимость урока должна быть не менее 500" })
  @Max(3000, { message: "Стоимость урока должно быть не более 3000" })
  lessonCost: number;

  @IsString()
  @MaxLength(1500, { message: "Описание должно быть не более 1500 символов" })
  @IsOptional()
  description: string;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @Min(1, { message: "Кол-во занятий в неделю должно быть не менее 1" })
  @Max(10, { message: "Кол-во занятий в неделю должно быть не более 10" })
  qtyLessonsPerWeek: number;

  @IsString()
  @MinLength(7, { message: "Телефон должен быть не менее 7 символов" })
  @MaxLength(30, { message: "Телефон должен быть не более 30 символов" })
  @IsOptional()
  phone: string;

  @IsString()
  @MinLength(3, { message: "Соц. сети должны быть не менее 3 символов" })
  @MaxLength(1000, { message: "Соц. сети должны быть не более 1000 символов" })
  @IsOptional()
  social: string;

  @IsString()
  @MaxLength(50, {
    message: "Логин ProgressMe должен быть не более 50 символов",
  })
  @IsOptional()
  progressMeLogin: string;

  @IsString()
  @MinLength(3, {
    message: "Пароль ProgressMe должен быть не менее 3 символов",
  })
  @MaxLength(50, {
    message: "Пароль ProgressMe должен быть не более 50 символов",
  })
  @IsOptional()
  progressMePassword: string;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @Min(1)
  @IsOptional()
  englishLevelId?: number;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @Min(1)
  @IsOptional()
  purposeLessonId?: number;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @Min(1)
  @IsOptional()
  colorId?: number;
}

export class StudentWithId extends Student {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;
}

export class StudentAggregation extends StudentWithId {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @IsOptional()
  paymentAmountPerMonth?: number;

  @IsOptional()
  lessons?: LessonWithId[];

  @IsOptional()
  color?: ColorWithId;

  @IsArray()
  @IsOptional()
  payments?: PaymentWithId[];

  @IsArray()
  @IsOptional()
  studentSchedules: StudentScheduleWithId[];

  @IsOptional()
  purposeLesson?: PurposeLessonWithId;

  @IsOptional()
  englishLevel?: EnglishLevelWithId;
}
