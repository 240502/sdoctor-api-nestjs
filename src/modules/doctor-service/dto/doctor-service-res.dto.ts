import { Expose } from 'class-transformer';

export class DoctorServiceResDto {
  @Expose({ name: 'id' })
  id: number;

  @Expose({ name: 'name' })
  name: string;

  @Expose()
  price: number;
}
