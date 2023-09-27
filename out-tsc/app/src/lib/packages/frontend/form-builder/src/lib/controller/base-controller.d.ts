import { Store } from '@ngrx/store';
import 'reflect-metadata';
export declare class BaseController {
    protected model: any;
    protected modelDefinition: any;
    protected store: Store<any>;
    constructor(model: any, store: Store<any>, modelDefinition?: any);
    getModel(): any;
    getModelClassName(): any;
    getModelName(): any;
    getStore(): Store<any>;
    getValue(name: string): any;
    getModelDefinition(): any;
    getElementLabel(fieldName: string): string;
}
