import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ClinicCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;

  @IsString()
  coverImage: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}
