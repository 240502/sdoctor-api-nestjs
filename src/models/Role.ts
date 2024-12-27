import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Index(
  'IDX_ae4578dcaed5adff96595e6166',
  ['name'],
  { unique: true },
)
@Entity('role', { schema: 'sdoctor' })
export class Role {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'name',
    unique: true,
    length: 255,
  })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
