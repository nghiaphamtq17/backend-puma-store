import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['customer', 'owner'], default: 'customer' })
  role: 'customer' | 'owner';

  @Column({
    type: 'enum',
    enum: ['individual', 'company'],
    default: 'individual',
  })
  type: 'individual' | 'company';

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  representative_name?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  representative_phone?: string;

  @Column({ type: 'json', nullable: true })
  documents?: Array<{ type: string; file_url: string }>;

  @Column({ type: 'json', nullable: true })
  avatar?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
