import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DoctorService } from "./DoctorService";
import { Doctor } from "./Doctor";
import { Appointment } from "./Appointment";
import { PaymentMethod } from "./PaymentMethod";

@Index("appointment_id", ["appointmentId"], {})
@Index("doctor_id", ["doctorId"], {})
@Index("payment_method", ["paymentMethod"], {})
@Index("service_id", ["serviceId"], {})
@Entity("invoices", { schema: "sdoctor" })
export class Invoices {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "appointment_id", nullable: true })
  appointmentId: number | null;

  @Column("int", { name: "doctor_id", nullable: true })
  doctorId: number | null;

  @Column("int", { name: "service_id", nullable: true })
  serviceId: number | null;

  @Column("int", { name: "amount", nullable: true })
  amount: number | null;

  @Column("varchar", { name: "status", nullable: true, length: 50 })
  status: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "payment_date", nullable: true })
  paymentDate: Date | null;

  @Column("int", { name: "payment_method", nullable: true })
  paymentMethod: number | null;

  @Column("varchar", { name: "patient_name", nullable: true, length: 255 })
  patientName: string | null;

  @Column("varchar", { name: "patient_phone", nullable: true, length: 255 })
  patientPhone: string | null;

  @ManyToOne(() => DoctorService, (doctorService) => doctorService.invoices, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "service_id", referencedColumnName: "id" }])
  service: DoctorService;

  @ManyToOne(() => Doctor, (doctor) => doctor.invoices, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "doctor_id", referencedColumnName: "doctorId" }])
  doctor: Doctor;

  @ManyToOne(() => Appointment, (appointment) => appointment.invoices, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "appointment_id", referencedColumnName: "id" }])
  appointment: Appointment;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.invoices, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "payment_method", referencedColumnName: "id" }])
  paymentMethod2: PaymentMethod;
}
