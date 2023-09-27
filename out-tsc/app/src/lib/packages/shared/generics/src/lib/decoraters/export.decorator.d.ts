import 'reflect-metadata';
import { ExportOptions } from "../types/options/export-options";
export declare const EXPORT_PREFIX = "fb:export";
export declare const EXPORT_PREFIX_ALL = "fb:export:all";
export declare function Export(options: ExportOptions): (target: object, key: string) => void;
