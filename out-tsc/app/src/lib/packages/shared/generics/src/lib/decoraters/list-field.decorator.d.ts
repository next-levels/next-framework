import 'reflect-metadata';
import { ListOptions } from '../types/options/list-options';
export declare const LISTFIELD_PREFIX = "lc:fields";
export declare const LISTFIELD_ALL_PREFIX = "lc:fields:all";
export declare function ListField(o: ListOptions): (target: object, propertyKey: string) => void;
