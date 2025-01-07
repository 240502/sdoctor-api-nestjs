import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class AppointmentFilterDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  pageIndex: number | null;
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  pageSize: number | null;
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  phone: string | null;
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  statusId: number | null;
}
