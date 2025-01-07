import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class AppointmentCreateDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsDate()
  appointmentDate: Date;

  @IsNotEmpty()
  @IsString()
  patientName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  patientPhone: string;

  @IsNotEmpty()
  @IsEmail()
  patientEmail: string;

  @IsNotEmpty()
  @IsDate()
  birthday: Date;

  @IsNotEmpty()
  province: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  commune: string;

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
