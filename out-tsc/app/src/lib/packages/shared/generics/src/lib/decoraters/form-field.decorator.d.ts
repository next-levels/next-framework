import 'reflect-metadata';
import { FormOptions } from '../types/options/form-options';
export declare const FORMFIELD_PREFIX = "fb:fields";
export declare const FORMFIELD_ALL_PREFIX = "fb:fields:all";
export declare function FormField(o: FormOptions): (target: object, propertyKey: string) => void;
