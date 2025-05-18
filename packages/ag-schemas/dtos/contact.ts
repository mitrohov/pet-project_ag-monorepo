import {
  MaxLength,
  MinLength,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  IsPositive,
  IsNotEmpty,
} from "class-validator";
import { OrderPlatformWithId } from "./order-platform";

export class Contact {
  @IsString()
  @MaxLength(50, { message: "ФИО должно быть не менее 3 символов" })
  @MinLength(3, { message: "ФИО должно быть не более 50 символов" })
  fio: string;

  @IsString()
  @MaxLength(30, { message: "Номер должен быть не более 30 символов" })
  @MinLength(7, { message: "Номер должен быть не менее 7 символов" })
  @IsOptional()
  mobileNumber: string;

  @IsString()
  @MaxLength(500, { message: "Соц. сети должны быть не менее 3 символов" })
  @MinLength(3, { message: "Соц. сети должны быть не более 500 символов" })
  @IsOptional()
  socials: string;

  @IsString()
  @MaxLength(1500, { message: "Описание должно быть не менее 3 символов" })
  @MinLength(3, { message: "Описание должно быть не более 1500 символов" })
  @IsOptional()
  description: string;

  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  @IsOptional()
  orderPlatformId: number;

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

export class ContactWithId extends Contact {
  @IsNumber()
  @IsPositive({ message: "Значение должно быть положительным числом" })
  @IsInt({ message: "Значение должно быть целым числом" })
  id: number;
}

export class ContactAggregation extends Contact {
  orderPlatform: OrderPlatformWithId;
}
