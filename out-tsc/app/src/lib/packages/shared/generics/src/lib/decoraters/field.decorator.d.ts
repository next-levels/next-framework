import 'reflect-metadata';
import { BuilderOptions } from '../types/options/base-options';
export declare const BUILDERFIELD_PREFIX = "bf:fields";
export declare const BUILDERFIELD_ALL_PREFIX = "bf:fields:all";
export declare function Field(o: BuilderOptions): (target: object, propertyKey: string) => void;
