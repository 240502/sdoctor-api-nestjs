import { IsNotEmpty, IsNumber } from 'class-validator';
import { DoctorCreateDto } from './doctor-create.dto';

export class DoctorUpdateDto extends DoctorCreateDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
