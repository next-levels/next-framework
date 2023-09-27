/// <reference types="multer" />
import 'reflect-metadata';
export declare const imageFileFilter: (req: any, file: any, callback: any) => any;
export declare const editFileName: (req: any, file: any, callback: any) => void;
export declare function generateFileName(file: any): string;
export declare const editFileNamePath: (req: any, file: any, callback: any) => void;
export declare function generateFilePath(req: any, file: any): string;
export declare function createArrayFromInstances<T>(...instances: T[]): T[];
export declare function convertItem<T>(item: Partial<T>, classConstructor: new () => T): T;
export declare function decodeBase64ToFile(base64: string, fieldName: string, mime?: string, type?: string): Promise<Express.Multer.File>;
