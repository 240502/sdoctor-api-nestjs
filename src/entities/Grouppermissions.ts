import { Column, Entity } from "typeorm";

@Entity("grouppermissions", { schema: "sdoctor" })
export class Grouppermissions {
  @Column("int", { primary: true, name: "role_id" })
  roleId: number;

  @Column("int", { primary: true, name: "function_id" })
  functionId: number;

  @Column("int", { name: "can_read", nullable: true })
  canRead: number | null;

  @Column("int", { name: "can_write", nullable: true })
  canWrite: number | null;

  @Column("int", { name: "can_update", nullable: true })
  canUpdate: number | null;

  @Column("int", { name: "can_delete", nullable: true })
  canDelete: number | null;

  @Column("int", { name: "can_confirm", nullable: true })
  canConfirm: number | null;
}
