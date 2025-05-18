import {
  MaxLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  MinLength,
  IsNotEmpty,
  Min,
  IsPositive,
} from "class-validator";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export class BotUser {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @MinLength(3, { message: "TG user name должно быть не менее 3 символов" })
  @MaxLength(50, { message: "TG user name должно быть не более 100 символов" })
  userName: string;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @Min(1)
  @IsOptional()
  chatId?: number | null;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  studentId: number;

  @IsBoolean()
  isActive: boolean;

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

export class BotUserWithId extends BotUser {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;
}
