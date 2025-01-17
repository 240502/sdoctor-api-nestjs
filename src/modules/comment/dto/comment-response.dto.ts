import { Expose, Transform } from 'class-transformer';

export class CommentReposeDto {
  @Expose({ name: 'RecordCount' })
  recordCount: number;

  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose({ name: 'date_booking' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  dateBooking: Date | null;

  @Expose({ name: 'doctor_id' })
  doctorId: number;

  @Expose({ name: 'full_name' })
  fullName: string;

  @Expose({ name: 'star_count' })
  starCount: number;

  @Expose({ name: 'created_at' })
  createdAt: Date;
}
