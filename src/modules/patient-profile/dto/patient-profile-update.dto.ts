import { IsNotEmpty, IsString } from 'class-validator';
import { PatientProfileCreateDto } from './patient-profile-create.dto';

export class PatientProfileUpdateDto extends PatientProfileCreateDto {
  @IsNotEmpty()
  @IsString()
  uuid: string;
}
