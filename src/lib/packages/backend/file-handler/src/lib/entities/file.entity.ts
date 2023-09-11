import { BaseFile } from '../base-file.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('files')
export class FileEntity implements BaseFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  file_index: string;

  @Column({ type: 'varchar', nullable: true })
  path: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  file_size: number;

  @Column({ type: 'varchar' })
  mime_type: string;

  @Column({ type: 'varchar', nullable: true })
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'varchar', nullable: true })
  field_name: string;

  @Column({ type: 'int', nullable: true })
  attachment_id: number;

  @Column({ type: 'varchar', nullable: true })
  attachment_type: string;

  @Column({ type: 'int', nullable: true })
  sort_order: number;

  @Column({ type: 'int', nullable: true })
  brightness: number;
}
