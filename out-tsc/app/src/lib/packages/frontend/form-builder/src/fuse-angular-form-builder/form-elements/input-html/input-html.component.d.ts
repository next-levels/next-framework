import { BaseInputHtmlComponent } from '../../../../public_api';
export declare class InputHtmlComponent extends BaseInputHtmlComponent {
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
