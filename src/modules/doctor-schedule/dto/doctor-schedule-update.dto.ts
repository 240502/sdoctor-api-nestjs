import { IsNotEmpty, IsNumber } from 'class-validator';

export class DoctorScheduleUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  scheduleDetails: [{ id: number; timeId: number; action: any }];
}
