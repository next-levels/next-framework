import 'reflect-metadata';
import { Constructor } from '../../../../../shared/generics/src';
export declare const MODELCLASS_PREFIX = "fb:models";
export declare const MODELCLASS_ALL_PREFIX = "fb:models:all";
export declare function Model(name: string): (constructor: Constructor) => void;
export declare function getModelByName(name: string): Constructor;
