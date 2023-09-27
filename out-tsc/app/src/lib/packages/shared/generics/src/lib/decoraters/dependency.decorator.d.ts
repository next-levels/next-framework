import 'reflect-metadata';
import { DependencyOptions } from '../types/options/dependency-options';
export declare const DEPENDENCY_PREFIX = "fb:dependency";
export declare function Dependency(d: DependencyOptions): (target: object, propertyKey: string) => void;
