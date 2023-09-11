import { TireGuarantee } from './tire-guarantee.model';
import { Field, FormField, Model } from '@nxtlvls/generic-types';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Model({
  name: 'damage-reports',
  url: 'damage-reports',
  label: 'Schadensmeldung',
  features: ['base', 'notification'],
})
export class DamageReport {
  @Field({ type: 'TEXT' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field({ type: 'TEXT', required: true })
  @Column({ type: 'varchar', nullable: true })
  profile_left: string;

  @Field({ type: 'FILE', required: true })
  @Column({ type: 'int', nullable: true })
  damage_image_id: number;

  @Field({ type: 'TEXTAREA', required: true })
  @Column({ type: 'varchar' })
  description: string;

  @Field({ type: 'RADIO', required: true })
  @Column({ type: 'varchar' })
  damage_type: string;

  @FormField({ type: 'TEXT' })
  @Column({ type: 'varchar', nullable: true })
  damage_type_other: string;

  @FormField({ type: 'FILE', required: true })
  new_tire_invoice_id: number;
  new_tire_invoice: any;

  @Field({ type: 'SIGN', options: { image_transparent: true } })
  @Column({ type: 'int', nullable: true })
  signature_field_id: number;
  signature_field: any;

  @FormField({ type: 'TEXT', required: true })
  @Column({ type: 'varchar', nullable: true })
  state: string;

  @Field({ type: 'DATE', required: true })
  @UpdateDateColumn({
    nullable: true,
  })
  created_at: string | null;

  @Field({ type: 'DATE', required: true })
  @CreateDateColumn({
    nullable: true,
  })
  updated_at: string | null;

  @Field({
    type: 'RELATION',
    options: { selector: 'tireGuarantee.id',
      detail_fields: [
        'tireGuarantee.licence_plate',
        'tireGuarantee.dealer_name',
        'tireGuarantee.dealer_postcode',
        'tireGuarantee.purchase_date',
        'tireGuarantee.invoice_number',
      ],
      model: new TireGuarantee() },
  })
  @Column({ type: 'int', nullable: true })
  tire_guarantee_id: number;
  tire_guarantee: TireGuarantee;

  @FormField({ type: 'TEXT', required: true })
  @Column({ type: 'varchar', nullable: true })
  bank_name: string;

  @FormField({ type: 'TEXT', required: true })
  @Column({ type: 'varchar', nullable: true })
  iban: string;

  @FormField({ type: 'TEXT', required: true })
  @Column({ type: 'varchar', nullable: true })
  bic: string;

  @FormField({ type: 'TEXT', required: true })
  @Column({ type: 'varchar', nullable: true })
  account_holder: string;
}
