import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ServiceCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  clinicId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsString()
  image: string;

  @IsString()
  preparationProcess: string;

  @IsString()
  serviceDetail: string;
}
