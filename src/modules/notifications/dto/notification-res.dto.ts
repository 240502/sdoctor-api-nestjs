import { Expose, Transform } from 'class-transformer';

export class NotificationResDto {
  @Expose()
  id: number;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose()
  message: string;

  @Expose({ name: 'is_read' })
  isRead: number;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Transform(({ value }) =>
    value ? new Date(value.toString().split('Z')[0]) : null,
  )
  updatedAt: Date;

  @Expose({ name: 'appointment_id' })
  appointmentId: number | null;

  @Expose({ name: 'RecordCount' })
  recordCount: number;
}
