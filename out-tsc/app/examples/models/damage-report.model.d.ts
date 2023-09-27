import { TireGuarantee } from './tire-guarantee.model';
export declare class DamageReport {
    id: number;
    profile_left: string;
    damage_image_id: number;
    description: string;
    damage_type: string;
    damage_type_other: string;
    new_tire_invoice_id: number;
    new_tire_invoice: any;
    signature_field_id: number;
    signature_field: any;
    state: string;
    created_at: string | null;
    updated_at: string | null;
    tire_guarantee_id: number;
    tire_guarantee: TireGuarantee;
    bank_name: string;
    iban: string;
    bic: string;
    account_holder: string;
}
