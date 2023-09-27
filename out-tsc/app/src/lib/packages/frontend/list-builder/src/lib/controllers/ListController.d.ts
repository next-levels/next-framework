import 'reflect-metadata';
import { BaseController } from './BaseController';
import { ScopeFilter } from '../../../../../shared/generics/src';
export declare class ListController extends BaseController {
    scope: ScopeFilter[];
    constructor(model: any);
    constructor(model: any, facade: any);
    constructor(model: any, facade?: any, modelDefinition?: any);
    setScope(key: string, operation: string, value: any): void;
    getScope(): ScopeFilter[];
}
