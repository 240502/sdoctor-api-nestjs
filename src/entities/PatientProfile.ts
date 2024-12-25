import { Column, Entity } from "typeorm";

@Entity("patient_profile", { schema: "sdoctor" })
export class PatientProfile {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "patient_name", length: 255 })
  patientName: string;

  @Column("int", { name: "gender" })
  gender: number;

  @Column("varchar", { name: "patient_phone", length: 11 })
  patientPhone: string;

  @Column("varchar", { name: "patient_email", length: 255 })
  patientEmail: string;

  @Column("date", { name: "birthday" })
  birthday: string;

  @Column("varchar", { name: "province", length: 255 })
  province: string;

  @Column("varchar", { name: "district", length: 255 })
  district: string;

  @Column("varchar", { name: "commune", length: 255 })
  commune: string;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("varchar", { name: "uuid", length: 500 })
  uuid: string;
}
