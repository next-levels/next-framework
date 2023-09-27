import 'reflect-metadata';
import { BaseFacadeType } from '../../../../generic-store/public_api';
import { ModelOptions } from '../../../../../shared/generics/src';
export declare class BaseController {
    protected model: any;
    protected modelDefinition: any;
    protected facade: BaseFacadeType;
    private modelClassName;
    constructor(model: any, facade: BaseFacadeType, modelDefinition?: any);
    getClassName(): string;
    getModel(): any;
    getModelClassName(): string;
    getModelName(): any;
    getModelOptions(model?: any): ModelOptions;
    getFacade(): BaseFacadeType;
    getValue(name: string): any;
    getModelDefinition(): any;
    getElementLabel(fieldName: string): string;
}
