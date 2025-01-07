import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ServiceFilterDto {
  @IsNumber()
  @IsOptional()
  pageIndex: number | null;

  @IsNumber()
  @IsOptional()
  pageSize: number | null;

  @IsNumber()
  @IsOptional()
  clinicId: number | null;

  @IsNumber()
  @IsOptional()
  categoryId: number | null;

  @IsNumber()
  @IsOptional()
  startPrice: number | null;

  @IsNumber()
  @IsOptional()
  endPrice: number | null;

  @IsString()
  @IsOptional()
  name: string | null;
}
