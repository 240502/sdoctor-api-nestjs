import { Expose, Transform } from 'class-transformer';

export class ClinicResponseDto {
  @Expose({ name: 'RecordCount' })
  recordCount: number;

  @Expose({ name: 'name' })
  name: string;

  @Expose()
  avatar: string;

  @Expose()
  description: string;

  @Expose()
  location: string;

  @Expose({ name: 'cover_image' })
  coveImage: string;

  @Expose({ name: 'created_at' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  updatedAt: Date;

  @Expose()
  views: number;
}
