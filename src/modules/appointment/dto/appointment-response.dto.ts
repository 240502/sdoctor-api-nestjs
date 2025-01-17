import { Expose, Transform } from 'class-transformer';

export class AppointmentResponseDto {
  @Expose({ name: 'RecordCount' })
  recordCount: number;

  @Expose()
  id: number;

  @Expose({ name: 'doctor_id' })
  doctorId: number;

  @Expose({ name: 'appointment_date' })
  @Transform(({ value }) => (value ? new Date(value) : null), {
    toClassOnly: true,
  })
  appointmentDate: Date;

  @Expose({ name: 'patient_name' })
  patientName: string;

  @Expose({ name: 'patient_phone' })
  patientPhone: string;

  @Expose({ name: 'patient_email' })
  patientEmail: string;

  @Expose()
  province: string;

  @Expose()
  district: string;

  @Expose()
  commune: string;

  @Expose({ name: 'examination_reason' })
  @Transform(({ value }) => (value ? value : null))
  examinationReason: string | null;

  @Expose({ name: 'time_id' })
  timeId: number | null;

  @Expose({ name: 'status_id' })
  statusId: number | null;

  @Expose({ name: 'created_at' })
  createdAt: Date | null;

  @Expose({ name: 'updated_at' })
  updatedAt: Date | null;

  @Expose({ name: 'price' })
  price: number;

  @Expose()
  birthday: Date;

  @Expose()
  gender: number;

  @Expose({ name: 'doctor_name' })
  doctorName: string;

  @Expose({ name: 'time_value' })
  timeValue: string;

  @Expose()
  location: string;

  @Expose({ name: 'rejection_reason' })
  rejectionReason: string | null;

  @Expose({ name: 'service_id' })
  serviceId: number;

  @Expose({ name: 'service_name' })
  serviceName: string;

  @Expose()
  isEvaluate: number | null;

  @Expose({ name: 'payment_method' })
  paymentMethod: number;

  @Expose({ name: 'status_name' })
  statusName: string;

  @Expose({ name: 'invoice_status' })
  invoiceStatus: string;
}
