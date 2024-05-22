import { Column, Entity, PrimaryColumn } from 'typeorm';
import { uuidTransformer } from '@next-levels/types';

@Entity('nxt_translations')
export class TranslationEntity {
  @PrimaryColumn({ type: 'varchar', length: 25 })
  model_type: string;

  @PrimaryColumn({
    type: 'binary',
    length: 16,
    generated: false,
    transformer: uuidTransformer,
  })
  model_id: string;

  @PrimaryColumn({
    type: 'binary',
    length: 16,
    generated: false,
    transformer: uuidTransformer,
  })
  lang_id: string;

  @Column({ type: 'text' })
  content: string;
}
