import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  IsNotEmpty,
  IsPositive,
} from "class-validator";

export class Settings {
  @IsString()
  @IsNotEmpty()
  field: string;

  @IsString()
  @IsNotEmpty()
  value: string;

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

export class SettingsWithId extends Settings {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;
}
