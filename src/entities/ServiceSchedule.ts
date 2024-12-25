import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Service } from "./Service";
import { ServiceScheduleDetail } from "./ServiceScheduleDetail";

@Index("service_id", ["serviceId"], {})
@Entity("service_schedule", { schema: "sdoctor" })
export class ServiceSchedule {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "service_id", nullable: true })
  serviceId: number | null;

  @Column("date", { name: "date", nullable: true })
  date: string | null;

  @Column("date", { name: "created_at", nullable: true })
  createdAt: string | null;

  @Column("date", { name: "updated_at", nullable: true })
  updatedAt: string | null;

  @ManyToOne(() => Service, (service) => service.serviceSchedules, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "service_id", referencedColumnName: "id" }])
  service: Service;

  @OneToMany(
    () => ServiceScheduleDetail,
    (serviceScheduleDetail) => serviceScheduleDetail.serviceSchedule
  )
  serviceScheduleDetails: ServiceScheduleDetail[];
}
