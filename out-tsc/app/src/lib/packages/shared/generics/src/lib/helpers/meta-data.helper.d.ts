import 'reflect-metadata';
import { Constructor } from '../types/Constructor';
import { ModelOptions } from '../types/options/model-options';
export declare const decorator_models: Constructor[];
export declare class META {
    static getModelByName(name: string): Constructor | undefined;
    static getNameByModel(constructor: Constructor): string | undefined;
    static getOptionsByModel(constructor: Constructor): ModelOptions | undefined;
    static getPrefixByModel(constructor: Constructor): ModelOptions | undefined;
}
