import { SweetAlertOptions } from 'sweetalert2';
export declare class SwalService {
    constructor();
    fireSuccess(options: SweetAlertOptions): void;
    fireValidation(): Promise<import("sweetalert2").SweetAlertResult<any>>;
}
