import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from 'class-validator';
export class DoctorCreateDto {
  @IsNotEmpty()
  @IsNumber()
  clinicId: number;

  @IsNotEmpty()
  @IsNumber()
  majorId: number;

  summary: string;
  title: string;
  introduction: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  gender: number;

  @IsNotEmpty()
  phone: string;

  image: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  birthday: Date;

  @IsNotEmpty()
  @IsNumber()
  serviceId: number;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  commune: string;
}
