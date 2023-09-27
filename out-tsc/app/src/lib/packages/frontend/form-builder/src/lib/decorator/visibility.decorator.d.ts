import 'reflect-metadata';
import { VisibilityOptions } from '../../../../../shared/generics/src';
export declare const VISIBILITY_PREFIX = "fb:visibility";
export declare const VISIBILITY_PREFIX_ALL = "fb:visibility:all";
export declare function Visibility(options: VisibilityOptions): (target: object, key: string) => void;
