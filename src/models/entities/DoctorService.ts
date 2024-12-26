import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Invoices } from "./Invoices";

@Entity("doctor_service", { schema: "sdoctor" })
export class DoctorService {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "price", nullable: true })
  price: number | null;

  @OneToMany(() => Invoices, (invoices) => invoices.service)
  invoices: Invoices[];
}
