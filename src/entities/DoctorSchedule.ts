import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Doctor } from "./Doctor";
import { DoctorScheduleDetail } from "./DoctorScheduleDetail";

@Index("doctor_id", ["doctorId"], {})
@Entity("doctor_schedule", { schema: "sdoctor" })
export class DoctorSchedule {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "doctor_id" })
  doctorId: number;

  @Column("date", { name: "date", nullable: true })
  date: string | null;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Doctor, (doctor) => doctor.doctorSchedules, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "doctor_id", referencedColumnName: "doctorId" }])
  doctor: Doctor;

  @OneToMany(
    () => DoctorScheduleDetail,
    (doctorScheduleDetail) => doctorScheduleDetail.schedule
  )
  doctorScheduleDetails: DoctorScheduleDetail[];
}
