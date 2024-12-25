import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ServiceSchedule } from "./ServiceSchedule";
import { Time } from "./Time";

@Index("service_schedule_id", ["serviceScheduleId"], {})
@Index("time_id", ["timeId"], {})
@Entity("service_schedule_detail", { schema: "sdoctor" })
export class ServiceScheduleDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "service_schedule_id", nullable: true })
  serviceScheduleId: number | null;

  @Column("int", { name: "time_id", nullable: true })
  timeId: number | null;

  @Column("int", { name: "available", nullable: true })
  available: number | null;

  @ManyToOne(
    () => ServiceSchedule,
    (serviceSchedule) => serviceSchedule.serviceScheduleDetails,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "service_schedule_id", referencedColumnName: "id" }])
  serviceSchedule: ServiceSchedule;

  @ManyToOne(() => Time, (time) => time.serviceScheduleDetails, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "time_id", referencedColumnName: "id" }])
  time: Time;
}
