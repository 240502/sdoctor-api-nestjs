import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { DoctorScheduleDetail } from 'src/models';

export class DoctorScheduleCreateDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsString()
  date: Date;

  @IsNotEmpty()
  doctorScheduleDetails: [
    {
      timeId: number;
    },
  ];
}
