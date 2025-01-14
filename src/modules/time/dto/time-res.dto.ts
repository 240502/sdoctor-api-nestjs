import { Expose } from 'class-transformer';

export class TimeResponseDto {
  @Expose()
  id: number;

  @Expose({ name: 'start_time' })
  startTime: string;

  @Expose({ name: 'end_time' })
  endTime: string;

  @Expose({ name: 'interval' })
  interval: number;
}
