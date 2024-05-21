import { Column, Entity, PrimaryColumn } from 'typeorm';
import { uuidTransformer } from '@next-levels/types';

@Entity('nxt_languages')
export class LanguagesEntity {
  @PrimaryColumn({
    type: 'binary',
    length: 16,
    generated: false,
    transformer: uuidTransformer,
  })
  id: string;

  @Column({ type: 'varchar' })
  iso: string;

  @Column({ type: 'varchar' })
  name: string;
}
