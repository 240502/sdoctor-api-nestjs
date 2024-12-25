import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("user_id", ["userId"], {})
@Entity("notifications", { schema: "sdoctor" })
export class Notifications {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("text", { name: "message" })
  message: string;

  @Column("int", { name: "is_read", nullable: true })
  isRead: number | null;

  @Column("datetime", { name: "created_at" })
  createdAt: Date;

  @Column("int", { name: "appointment_id", nullable: true })
  appointmentId: number | null;

  @ManyToOne(() => User, (user) => user.notifications, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
