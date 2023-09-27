import { BaseInputComponent } from './base-input.component';
export declare class BaseInputHtmlComponent extends BaseInputComponent {
    quillConfiguration: {
        toolbar: (string[] | {
            list: string;
        }[] | {
            header: (number | boolean)[];
        }[] | ({
            color: any[];
            background?: undefined;
        } | {
            background: any[];
            color?: undefined;
        })[])[];
    };
    onEventChange(event: any): void;
}
