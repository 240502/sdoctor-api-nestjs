import { IsNumber, IsString } from 'class-validator';

export class ServiceFilterDto {
  @IsNumber()
  pageIndex: number | null;

  @IsNumber()
  pageSize: number | null;

  @IsNumber()
  clinicId: number | null;

  @IsNumber()
  categoryId: number | null;

  @IsNumber()
  startPrice: number | null;

  @IsNumber()
  endPrice: number | null;

  @IsString()
  name: string | null;
}
