import { IsOptional, IsString } from 'class-validator';

export class PaymentQueryFiltersDto {
  @IsString()
  @IsOptional()
  studentId: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  sum: string;

  @IsString()
  @IsOptional()
  lessonQty: string;

  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  rows: string;
}
