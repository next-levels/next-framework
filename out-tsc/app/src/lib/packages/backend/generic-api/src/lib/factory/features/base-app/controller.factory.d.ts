import { Type } from '@nestjs/common';
import { ControllerConfig } from '../../../types/controller-config.type';
export declare function GenericBaseApiController<T extends Type<any>>(entity: T, event?: any): any;
export declare function GenericBaseApiControllerCreator<T extends Type<any>>(config: ControllerConfig, event?: any): any;
