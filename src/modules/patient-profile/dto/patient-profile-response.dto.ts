import { Expose, Transform } from 'class-transformer';

export class PatientProfileResponse {
  @Expose()
  id: string;

  @Expose()
  uuid: string;

  @Expose({ name: 'patient_name' })
  patientName: string;

  @Expose()
  gender: number;

  @Expose({ name: 'patient_phone' })
  patientPhone: string;

  @Expose({ name: 'patient_email' })
  patientEmail: string;

  @Expose()
  birthday: string;

  @Expose()
  province: string;

  @Expose()
  district: string;

  @Expose()
  commune: string;

  @Expose({ name: 'created_at' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  updatedAt: Date;
}
