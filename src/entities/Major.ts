import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./Doctor";

@Entity("major", { schema: "sdoctor" })
export class Major {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "image", nullable: true, length: 255 })
  image: string | null;

  @Column("int", { name: "views", nullable: true })
  views: number | null;

  @OneToMany(() => Doctor, (doctor) => doctor.major)
  doctors: Doctor[];
}
