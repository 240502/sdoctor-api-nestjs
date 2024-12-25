import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { DoctorScheduleDetail } from "./DoctorScheduleDetail";
import { ServiceScheduleDetail } from "./ServiceScheduleDetail";

@Entity("time", { schema: "sdoctor" })
export class Time {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "start_time", nullable: true, length: 255 })
  startTime: string | null;

  @Column("varchar", { name: "end_time", nullable: true, length: 255 })
  endTime: string | null;

  @Column("int", { name: "interval" })
  interval: number;

  @OneToMany(() => Appointment, (appointment) => appointment.time)
  appointments: Appointment[];

  @OneToMany(
    () => DoctorScheduleDetail,
    (doctorScheduleDetail) => doctorScheduleDetail.time
  )
  doctorScheduleDetails: DoctorScheduleDetail[];

  @OneToMany(
    () => ServiceScheduleDetail,
    (serviceScheduleDetail) => serviceScheduleDetail.time
  )
  serviceScheduleDetails: ServiceScheduleDetail[];
}
