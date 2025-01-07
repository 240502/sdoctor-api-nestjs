import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { DoctorScheduleDetail } from 'src/models';

export class DoctorScheduleCreateDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  doctorScheduleDetails: [
    {
      timeId: number;
    },
  ];
}
