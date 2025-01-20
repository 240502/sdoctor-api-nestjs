import { Expose, Transform } from 'class-transformer';

export class ClinicResponseDto {
  @Expose({ name: 'RecordCount' })
  recordCount: number;

  @Expose({ name: 'name' })
  name: string;

  @Expose()
  @Transform(({ value }) => (value ? value : null))
  avatar: string;

  @Expose({ name: 'description' })
  @Transform(({ value }) => (value ? value : null))
  description: string | null;

  @Expose({ name: 'location' })
  @Transform(({ value }) => (value ? value : null))
  location: string | null;

  @Expose({ name: 'cover_image' })
  @Transform(({ value }) => (value ? value : null))
  coverImage: string | null;

  @Expose({ name: 'created_at' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  updatedAt: Date;

  @Expose()
  @Transform(({ value }) => (value ? value : null))
  views: number | null;
}
