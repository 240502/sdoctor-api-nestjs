import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DoctorSchedule } from "./DoctorSchedule";
import { Time } from "./Time";

@Index("schedule_id", ["scheduleId"], {})
@Index("time_id", ["timeId"], {})
@Entity("doctor_schedule_detail", { schema: "sdoctor" })
export class DoctorScheduleDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "schedule_id", nullable: true })
  scheduleId: number | null;

  @Column("int", { name: "available", nullable: true })
  available: number | null;

  @Column("int", { name: "time_id", nullable: true })
  timeId: number | null;

  @ManyToOne(
    () => DoctorSchedule,
    (doctorSchedule) => doctorSchedule.doctorScheduleDetails,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "schedule_id", referencedColumnName: "id" }])
  schedule: DoctorSchedule;

  @ManyToOne(() => Time, (time) => time.doctorScheduleDetails, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "time_id", referencedColumnName: "id" }])
  time: Time;
}
