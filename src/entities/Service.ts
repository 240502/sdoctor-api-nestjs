import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Clinic } from "./Clinic";
import { ServiceSchedule } from "./ServiceSchedule";

@Index("clinic_id", ["clinicId"], {})
@Entity("service", { schema: "sdoctor" })
export class Service {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "summary" })
  summary: string;

  @Column("int", { name: "price" })
  price: number;

  @Column("int", { name: "clinic_id", nullable: true })
  clinicId: number | null;

  @Column("int", { name: "category_id", nullable: true })
  categoryId: number | null;

  @Column("varchar", { name: "image", nullable: true, length: 255 })
  image: string | null;

  @Column("text", { name: "preparation_process", nullable: true })
  preparationProcess: string | null;

  @Column("int", { name: "views", nullable: true })
  views: number | null;

  @Column("text", { name: "service_detail", nullable: true })
  serviceDetail: string | null;

  @ManyToOne(() => Clinic, (clinic) => clinic.services, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "clinic_id", referencedColumnName: "id" }])
  clinic: Clinic;

  @OneToMany(
    () => ServiceSchedule,
    (serviceSchedule) => serviceSchedule.service
  )
  serviceSchedules: ServiceSchedule[];
}
