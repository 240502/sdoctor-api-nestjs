import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("service_category", { schema: "sdoctor" })
export class ServiceCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;
}
