import { DamageReport } from './damage-report.model';
export declare class TireGuarantee {
    id: number;
    created_at: string | null;
    updated_at: string | null;
    user_id: number;
    licence_plate: string;
    tireId: number;
    tire_variant_id: number;
    dealer_name: string;
    dealer_postcode: string;
    purchase_date: string;
    invoice_id: number;
    invoice: any;
    invoice_number: string;
    damageReports_id: number;
    damageReports: DamageReport[];
}
