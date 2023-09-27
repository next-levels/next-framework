import 'reflect-metadata';
import { AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { TranslateService } from '@ngx-translate/core';
import { FormController } from '../../../../../form-builder/src';
import { ListOptions, ScopeFilter } from '../../../../../../shared/generics/src';
import { ListController } from '../../controllers/ListController';
export declare class ViewModalComponent implements AfterViewInit, OnInit {
    private readonly _matDialog;
    data: {
        model: any;
        modelFacade: any;
        formController: FormController;
        edit: boolean;
        values: any;
    };
    translateService: TranslateService;
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
    listController: ListController;
    _fields: any[];
    className: string;
    stepperComponent: MatStepper;
    constructor(_matDialog: MatDialog, data: {
        model: any;
        modelFacade: any;
        formController: FormController;
        edit: boolean;
        values: any;
    }, translateService: TranslateService, cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    getSettingsField(field: string): ListOptions;
    close(): void;
}
