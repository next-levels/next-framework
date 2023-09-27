import { AfterViewInit, ChangeDetectorRef, EventEmitter, ViewContainerRef } from '@angular/core';
import { FormController } from '../../controller/form-controller';
import { FormControl } from '@angular/forms';
import { FormComponents, FormOptions } from '../../../../../../shared/generics/src';
export declare class FormElementComponent implements AfterViewInit {
    private cdRef;
    private formBuilderComponents;
    view: ViewContainerRef | undefined;
    formField: FormOptions;
    formController: FormController;
    fieldName: string;
    dataOutput: EventEmitter<any>;
    constructor(cdRef: ChangeDetectorRef, formBuilderComponents: FormComponents);
    ngAfterViewInit(): void;
    initComponent(componentRef: any): void;
    getFormControl(): FormControl | null;
}
