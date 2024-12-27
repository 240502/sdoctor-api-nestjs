import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doctor } from './Doctor';
import { Notifications } from './Notifications';
import { Role } from './Role';
import { Functions } from './Functions';

@Index('role_id', ['roleId'], {})
@Entity('user', { schema: 'sdoctor' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'user_id',
  })
  userId: number;

  @Column('varchar', {
    name: 'password',
    nullable: true,
    length: 255,
  })
  password: string | null;

  @Column('int', {
    name: 'role_id',
    nullable: true,
  })
  roleId: number | null;

  @Column('date', {
    name: 'created_at',
    nullable: true,
  })
  createdAt: string | null;

  @Column('date', {
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: string | null;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    length: 255,
  })
  email: string | null;

  @Column('int', {
    name: 'gender',
    nullable: true,
  })
  gender: number | null;

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    length: 255,
  })
  phone: string | null;

  @Column('varchar', {
    name: 'image',
    nullable: true,
    length: 255,
  })
  image: string | null;

  @Column('varchar', {
    name: 'full_name',
    nullable: true,
    length: 255,
  })
  fullName: string | null;

  @Column('date', {
    name: 'birthday',
    nullable: true,
  })
  birthday: string | null;

  @Column('int', {
    name: 'active',
    nullable: true,
  })
  active: number | null;

  @Column('varchar', {
    name: 'city',
    nullable: true,
    length: 255,
  })
  city: string | null;

  @Column('varchar', {
    name: 'district',
    nullable: true,
    length: 255,
  })
  district: string | null;

  @Column('varchar', {
    name: 'commune',
    nullable: true,
    length: 255,
  })
  commune: string | null;

  @OneToOne(() => Doctor, (doctor) => doctor.user)
  doctors: Doctor;

  @OneToMany(
    () => Notifications,
    (notifications) => notifications.user,
  )
  notifications: Notifications[];

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  ])
  role: Role;

  functions: Functions[];
  token: string;
  doctorId: number;
}
