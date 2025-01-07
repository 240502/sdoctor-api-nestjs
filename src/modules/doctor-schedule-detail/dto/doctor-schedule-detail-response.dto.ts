import { Expose } from 'class-transformer';

export class DoctorScheduleDetailResponseDto {
  @Expose()
  id: number;

  @Expose({ name: 'schedule_id' })
  scheduleId: number;

  @Expose({ name: 'time_id' })
  timeId: number;

  @Expose({ name: 'available' })
  available: number;

  @Expose({ name: 'start_time' })
  startTime: string;

  @Expose({ name: 'end_time' })
  endTime: string;
}
