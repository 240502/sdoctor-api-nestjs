import { IsNotEmpty, IsString } from 'class-validator';
import { ClinicCreateDto } from './clinic-create.dto';

export class ClinicUpdateDto extends ClinicCreateDto {
  @IsNotEmpty()
  @IsString()
  id: number;
}
