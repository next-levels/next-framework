import { Type } from '@nestjs/common';
export declare function getFeatures<T extends Type<any>>(entity: T, route: string, features?: string[], userScope?: boolean): any;
