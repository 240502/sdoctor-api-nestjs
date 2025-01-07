import { IsInt, IsOptional, IsString } from 'class-validator';

export class PostFilterDto {
  @IsString()
  @IsOptional()
  searchContent: string | null;

  @IsInt()
  @IsOptional()
  categoryId: number | null;

  @IsInt()
  @IsOptional()
  pageIndex: number | null;

  @IsInt()
  @IsOptional()
  pageSize: number | null;

  @IsString()
  @IsOptional()
  status: string;

  @IsInt()
  @IsOptional()
  authorId: number;
}
