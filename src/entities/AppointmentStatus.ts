import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";

@Entity("appointment_status", { schema: "sdoctor" })
export class AppointmentStatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @OneToMany(() => Appointment, (appointment) => appointment.status)
  appointments: Appointment[];
}
