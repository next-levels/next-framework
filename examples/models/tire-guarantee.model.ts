import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field, FormField, Model } from '@nxtlvls/generic-types';
import { FrontendUser } from './frontend-user';
import { TireVariant } from './tire-variant';
import { DamageReport } from './damage-report.model';

@Model({
  name: 'tire-guarantee',
  label: 'Reifen-Garantie',
  features: ['base','notification'],
  url: 'tire-guarantee',
})
export class TireGuarantee {
  @Field({ type: 'TEXT' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field({ type: 'DATE' })
  @CreateDateColumn()
  created_at: string | null;

  @CreateDateColumn()
  updated_at: string | null;

  @Field({
    type: 'RELATION',
    options: {
      selector: 'user.first_name',
      detail_fields: [
        'user.first_name',
        'user.last_name',
        'user.email',
        'user.country',
      ],
    },
  })
  @Column({ type: 'int', nullable: true })
  user_id: number;
  user: FrontendUser;

  @Field({ type: 'TEXT', required: true })
  @Column({ type: 'varchar', nullable: true })
  licence_plate: string;

  @Field({
    type: 'RELATION',
    required: true,
    options: { map: 'tire_variant.tireId' },
  })
  tireId: number;

  @Field({
    type: 'RELATION',
    required: true,
    options: { selector: 'tire_variant.article_number' },
  })
  @Column({ type: 'int' })
  tire_variant_id: number;
  tire_variant: TireVariant;

  @Field({ type: 'TEXT', required: true })
  @Column({ type: 'varchar', nullable: true })
  dealer_name: string;

  @Field({ type: 'TEXT', required: true })
  @Column({ type: 'varchar', nullable: true })
  dealer_postcode: string;

  @Field({ type: 'DATE', required: true })
  @CreateDateColumn()
  purchase_date: string;

  @Field({ type: 'FILE', required: true })
  @Column({ type: 'int', nullable: true })
  invoice_id: number;
  invoice: any;

  @Field({ type: 'TEXT', required: true })
  @Column({ type: 'varchar', nullable: true })
  invoice_number: string;

  @FormField({
    type: 'RELATION',
  })
  damageReports_id: number;
  damageReports: DamageReport[];
}
