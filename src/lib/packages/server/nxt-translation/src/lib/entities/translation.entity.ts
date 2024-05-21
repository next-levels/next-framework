import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('nxt_translations')
export class TranslationEntity {
  @PrimaryColumn({ type: 'varchar', length: 25 })
  model_type: string;

  @PrimaryColumn({
    type: 'binary',
    length: 16,
    generated: false,
  })
  model_id: string;

  @PrimaryColumn({
    type: 'binary',
    length: 16,
    generated: false,
  })
  lang_id: string;

  @Column({ type: 'text' })
  content: string;
}
