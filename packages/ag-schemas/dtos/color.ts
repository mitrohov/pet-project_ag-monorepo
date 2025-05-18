import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  MinLength,
  IsInt,
  IsNotEmpty,
  IsPositive,
} from "class-validator";

export class Color {
  @IsString()
  @MinLength(3, { message: "Название цвета должно быть не менее 3 символов" })
  @MaxLength(50, { message: "Название цвета должно быть не более 50 символов" })
  title: string;

  @IsString()
  @MinLength(3, { message: "Код цвета должен быть не менее 3 символов" })
  @MaxLength(50, { message: "Код цвета должен быть не более 50 символов" })
  code: string;

  @IsString()
  @MinLength(3, { message: "Цвет шрифта должен быть не менее 3 символов" })
  @MaxLength(50, { message: "Цвет шрифта должен быть не более 50 символов" })
  color: string;

  @IsString()
  @MinLength(3, { message: "Цвет фона должен быть не менее 3 символов" })
  @MaxLength(50, { message: "Цвет фона должен быть не более 50 символов" })
  backgroundColor: string;

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

export class ColorWithId extends Color {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;
}
