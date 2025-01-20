import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class AppointmentCreateDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsString()
  appointmentDate: string;

  @IsNotEmpty()
  @IsString()
  patientName: string;

  @IsNotEmpty()
  @IsString()
  patientPhone: string;

  @IsNotEmpty()
  @IsEmail()
  patientEmail: string;

  @IsNotEmpty()
  @IsString()
  birthday: string;

  @IsNotEmpty()
  province: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  commune: string;

  @IsOptional()
  examinationReason: string;

  @IsNotEmpty()
  @IsNumber()
  timeId: string;

  @IsNotEmpty()
  @IsNumber()
  gender: number;

  @IsNotEmpty()
  @IsString()
  doctorName: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  timeValue: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  serviceId: number;

  @IsNotEmpty()
  @IsString()
  serviceName: string;
}
