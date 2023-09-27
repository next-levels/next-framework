import 'reflect-metadata';
import { AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { SwalService } from '../../services/swal/swal.service';
import { MinimizeService } from '../../services/minimize/minimize.service';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { FormController } from '../../../../../form-builder/src';
import { ScopeFilter } from '../../../../../../shared/generics/src';
export declare class CreateWizardComponent implements AfterViewInit, OnInit {
    private swalService;
    private readonly _matDialog;
    data: {
        model: any;
        modelFacade: any;
        scope: ScopeFilter[];
        formController: FormController;
        edit: boolean;
        values: any;
    };
    minimizeService: MinimizeService;
    private cdRef;
    formStepValid: boolean;
    currentStep: number;
    steps: {
        index: number;
        arrayIndex: number;
        title: string;
        description: string;
        fields: any[];
    }[];
    model: any;
    values: any;
    state: any;
    action: () => void;
    edit: boolean;
    formController: FormController;
    modelFacade: any;
    scope: ScopeFilter[];
    className: string;
    stepperComponent: MatStepper;
    constructor(swalService: SwalService, _matDialog: MatDialog, data: {
        model: any;
        modelFacade: any;
        scope: ScopeFilter[];
        formController: FormController;
        edit: boolean;
        values: any;
    }, minimizeService: MinimizeService, cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    getSteps(fileFields: any): void;
    nextStep(): void;
    prevStep(): void;
    isValid(): void;
    fireAction(): void;
    onDismiss(): void;
}
