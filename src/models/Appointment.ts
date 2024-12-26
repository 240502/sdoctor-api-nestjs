import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Time } from "./Time";
import { AppointmentStatus } from "./AppointmentStatus";
import { Doctor } from "./Doctor";
import { Invoices } from "./Invoices";

@Index("time_id", ["timeId"], {})
@Index("status_id", ["statusId"], {})
@Index("doctor_id", ["doctorId"], {})
@Entity("appointment", { schema: "sdoctor" })
export class Appointment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "doctor_id" })
  doctorId: number;

  @Column("date", { name: "appointment_date", nullable: true })
  appointmentDate: string | null;

  @Column("varchar", { name: "patient_name", nullable: true, length: 255 })
  patientName: string | null;

  @Column("varchar", { name: "patient_phone", length: 11 })
  patientPhone: string;

  @Column("varchar", { name: "patient_email", length: 255 })
  patientEmail: string;

  @Column("varchar", { name: "province", length: 100 })
  province: string;

  @Column("varchar", { name: "district", length: 100 })
  district: string;

  @Column("varchar", { name: "commune", length: 100 })
  commune: string;

  @Column("text", { name: "examination_reason", nullable: true })
  examinationReason: string | null;

  @Column("int", { name: "time_id" })
  timeId: number;

  @Column("int", { name: "status_id" })
  statusId: number;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "price", nullable: true })
  price: number | null;

  @Column("date", { name: "birthday", nullable: true })
  birthday: string | null;

  @Column("int", { name: "gender", nullable: true })
  gender: number | null;

  @Column("varchar", { name: "doctor_name", nullable: true, length: 255 })
  doctorName: string | null;

  @Column("varchar", { name: "time_value", nullable: true, length: 255 })
  timeValue: string | null;

  @Column("varchar", { name: "location", nullable: true, length: 255 })
  location: string | null;

  @Column("text", { name: "rejection_reason", nullable: true })
  rejectionReason: string | null;

  @Column("int", { name: "service_id", nullable: true })
  serviceId: number | null;

  @Column("varchar", { name: "service_name", nullable: true, length: 255 })
  serviceName: string | null;

  @Column("int", { name: "isEvaluate", nullable: true })
  isEvaluate: number | null;

  @ManyToOne(() => Time, (time) => time.appointments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "time_id", referencedColumnName: "id" }])
  time: Time;

  @ManyToOne(
    () => AppointmentStatus,
    (appointmentStatus) => appointmentStatus.appointments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "status_id", referencedColumnName: "id" }])
  status: AppointmentStatus;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "doctor_id", referencedColumnName: "doctorId" }])
  doctor: Doctor;

  @OneToMany(() => Invoices, (invoices) => invoices.appointment)
  invoices: Invoices[];
}
