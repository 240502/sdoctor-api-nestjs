import { IsNotEmpty, IsString } from 'class-validator';
import { ServiceCreateDto } from './service-create.dto';

export class ServiceUpdateDto extends ServiceCreateDto {
  @IsNotEmpty()
  @IsString()
  id: number;
}
