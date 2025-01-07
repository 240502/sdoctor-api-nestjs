import { Expose, Transform } from 'class-transformer';
import { DoctorScheduleDetailResponseDto } from 'src/modules/doctor-schedule-detail/dto';

export class DoctorScheduleResponseDto {
  @Expose()
  id: number;

  @Expose({ name: 'doctor_id' })
  doctorId: number;

  @Expose()
  @Transform(({ value }) => (value ? new Date(value) : null))
  date: Date | null;

  @Expose({ name: 'created_at' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  createdAt: Date | null;

  @Expose({ name: 'updated_at' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  updatedAt: Date | null;

  doctorScheduleDetails: DoctorScheduleDetailResponseDto[];
}
