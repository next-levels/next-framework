import { OnInit } from '@angular/core';
import { BaseInputComponent } from './base-input.component';
export declare class BaseInputDropdownComponent extends BaseInputComponent implements OnInit {
    options: any[];
    init(): void;
    logChange(event: any): void;
}
