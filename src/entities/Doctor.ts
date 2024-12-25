import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appointment } from "./Appointment";
import { Comment } from "./Comment";
import { Clinic } from "./Clinic";
import { Major } from "./Major";
import { DoctorSchedule } from "./DoctorSchedule";
import { Invoices } from "./Invoices";

@Index("clinic_id", ["clinicId"], {})
@Index("major_id", ["majorId"], {})
@Entity("doctor", { schema: "sdoctor" })
export class Doctor {
  @PrimaryGeneratedColumn({ type: "int", name: "doctor_id" })
  doctorId: number;

  @Column("int", { name: "clinic_id", nullable: true })
  clinicId: number | null;

  @Column("int", { name: "major_id", nullable: true })
  majorId: number | null;

  @Column("text", { name: "summary", nullable: true })
  summary: string | null;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("int", { name: "views", nullable: true })
  views: number | null;

  @Column("text", { name: "introduction", nullable: true })
  introduction: string | null;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "service_id", nullable: true })
  serviceId: number | null;

  @Column("double", { name: "average_star", nullable: true, precision: 22 })
  averageStar: number | null;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  @OneToMany(() => Comment, (comment) => comment.doctor)
  comments: Comment[];

  @ManyToOne(() => Clinic, (clinic) => clinic.doctors, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "clinic_id", referencedColumnName: "id" }])
  clinic: Clinic;

  @ManyToOne(() => Major, (major) => major.doctors, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "major_id", referencedColumnName: "id" }])
  major: Major;

  @OneToMany(() => DoctorSchedule, (doctorSchedule) => doctorSchedule.doctor)
  doctorSchedules: DoctorSchedule[];

  @OneToMany(() => Invoices, (invoices) => invoices.doctor)
  invoices: Invoices[];
}
