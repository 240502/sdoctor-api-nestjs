import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Doctor } from "./Doctor";

@Index("doctor_id", ["doctorId"], {})
@Entity("comment", { schema: "sdoctor" })
export class Comment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "content" })
  content: string;

  @Column("datetime", { name: "date_booking", nullable: true })
  dateBooking: Date | null;

  @Column("int", { name: "doctor_id", nullable: true })
  doctorId: number | null;

  @Column("varchar", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("varchar", { name: "full_name", nullable: true, length: 255 })
  fullName: string | null;

  @Column("varchar", { name: "type", nullable: true, length: 255 })
  type: string | null;

  @Column("float", { name: "start_count", nullable: true, precision: 12 })
  startCount: number | null;

  @ManyToOne(() => Doctor, (doctor) => doctor.comments, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "doctor_id", referencedColumnName: "doctorId" }])
  doctor: Doctor;
}
