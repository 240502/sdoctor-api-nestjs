import { Expose } from 'class-transformer';

export class AppointmentStatusResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
