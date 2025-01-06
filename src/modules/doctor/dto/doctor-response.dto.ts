import { Expose, Transform } from 'class-transformer';

export class DoctorResponseDto {
  @Expose({ name: 'RecordCount' })
  recordCount: number;

  @Expose({ name: 'doctor_id' })
  doctorId: number;

  @Expose({ name: 'full_name' })
  fullName: string;

  @Expose({ name: 'clinic_id' })
  clinicId: number;

  @Expose({ name: 'major_id' })
  majorId: number;

  @Expose({ name: 'summary' })
  summary: string;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'image' })
  image: string;

  @Expose({ name: 'email' })
  email: string;

  @Expose({ name: 'phone' })
  phone: string;

  @Transform(({ value }) => (value ? new Date(value) : null), {
    toClassOnly: true,
  })
  @Expose({ name: 'created_at' })
  createdAt: Date | null;

  @Transform(({ value }) => (value ? new Date(value) : null), {
    toClassOnly: true,
  })
  @Expose({ name: 'updated_at' })
  updatedAt: Date | null;

  @Expose()
  city: string;

  @Expose()
  district: string;

  @Expose()
  commune: string;

  @Expose()
  gender: number;

  @Expose()
  title: string;

  @Expose()
  price: number;

  @Expose()
  views: number;

  @Expose()
  introduction: string;

  @Expose({ name: 'clinic_name' })
  clinicName: string;

  @Expose()
  location: string;

  @Expose({ name: 'major_name' })
  majorName: string;

  @Expose({ name: 'service_name' })
  serviceName: string;

  @Transform(({ value }) => (value ? new Date(value) : null), {
    toClassOnly: true,
  })
  @Expose({ name: 'birthday' })
  birthday: Date | null;

  @Expose({ name: 'service_id' })
  serviceId: number;

  @Expose({ name: 'average_star' })
  averageStar: number;
}
