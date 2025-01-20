import { Expose, Transform } from 'class-transformer';

export class InvoiceResponseDto {
  @Expose()
  id: number;
  @Expose({ name: 'RecordCount' })
  recordCount: number;

  @Expose({ name: 'appointment_id' })
  appointmentId: number;

  @Expose({ name: 'appointment_date' })
  appointmentDate: Date;

  @Expose({ name: 'doctor_id' })
  doctorId: number;

  @Expose({ name: 'service_id' })
  serviceId: number;

  @Expose({ name: 'status' })
  status: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  @Expose({ name: 'payment_date' })
  paymentDate: Date;

  @Expose({ name: 'payment_method' })
  paymentMethod: number;

  @Expose({ name: 'payment_name' })
  paymentName: string;

  @Expose({ name: 'patient_name' })
  patientName: string;

  @Expose({ name: 'patient_phone' })
  patientPhone: string;

  @Expose({ name: 'time_value' })
  timeValue: string;

  @Expose({ name: 'amount' })
  amount: number;

  @Expose({ name: 'service_name' })
  serviceName: string;
}
