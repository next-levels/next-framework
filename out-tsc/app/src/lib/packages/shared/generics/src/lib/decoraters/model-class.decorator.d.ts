import 'reflect-metadata';
import { Constructor } from '../types/Constructor';
import { ModelOptions } from '../types/options/model-options';
export declare const MODELCLASS_PREFIX = "fb:models";
export declare const MODELCLASS_OPTIONS_PREFIX = "fb:models:options";
export declare const MODELCLASS_ALL_PREFIX = "fb:models:all";
export declare function Model(config: string | ModelOptions): (constructor: Constructor) => void;
export declare function getModelByName(name: string): Constructor;
