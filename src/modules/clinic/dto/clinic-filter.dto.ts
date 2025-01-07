import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ClinicFilterDto {
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
  location: string | null;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  name: string | null;
}
