import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsEmail,
  Matches,
  MaxDate,
} from 'class-validator';

export class PatientProfileCreateDto {
  @IsNotEmpty()
  @IsString()
  patientName: string;

  @IsNotEmpty()
  @IsNumber()
  gender: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  patientEmail: string;

  @IsNotEmpty()
  @Matches(/^(0[3-9]\d{8})$/, {
    message: 'Số điện thoại không hợp lệ',
  })
  patientPhone: string;

  @IsNotEmpty()
  birthday: string;

  @IsNotEmpty()
  @IsString()
  province: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  commune: string;
}
