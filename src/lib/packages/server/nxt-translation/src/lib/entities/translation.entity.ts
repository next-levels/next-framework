import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nxt_translations')
export class TranslationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  model_type: string;

  @Column({ type: 'int' })
  model_id: number;

  @Column({ type: 'varchar' })
  lang: string;

  @Column({ type: 'text' })
  content: string;
}
