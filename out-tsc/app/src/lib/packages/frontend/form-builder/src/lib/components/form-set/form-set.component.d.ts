import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormController } from '../../controller/form-controller';
import { FormOptions } from '../../../../../../shared/generics/src';
export declare class FormSetComponent implements OnInit {
    formFields: FormOptions[];
    fields: string[];
    controller: FormController;
    readOnly: boolean;
    noLabel: boolean;
    submitted: boolean;
    formValid: EventEmitter<boolean>;
    fg: FormGroup;
    ngOnInit(): void;
    isFormValid(event: any): void;
}
