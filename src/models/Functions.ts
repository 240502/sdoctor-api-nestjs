import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('functions', { schema: 'sdoctor' })
export class Functions {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'function_name',
    nullable: true,
    length: 255,
  })
  functionName: string | null;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
  })
  createdAt: Date | null;

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('int', {
    name: 'parent_id',
    nullable: true,
  })
  parentId: number | null;

  @Column('varchar', {
    name: 'icon',
    nullable: true,
    length: 255,
  })
  icon: string | null;

  @Column('int', { name: 'sort', nullable: true })
  sort: number | null;

  @Column('varchar', {
    name: 'link',
    nullable: true,
    length: 255,
  })
  link: string | null;
}
