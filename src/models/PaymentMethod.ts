import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Invoices } from "./Invoices";

@Entity("payment_method", { schema: "sdoctor" })
export class PaymentMethod {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @OneToMany(() => Invoices, (invoices) => invoices.paymentMethod2)
  invoices: Invoices[];
}
