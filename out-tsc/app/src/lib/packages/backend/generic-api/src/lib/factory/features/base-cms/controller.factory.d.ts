import { Type } from '@nestjs/common';
import { ControllerConfig } from '../../../types/controller-config.type';
export declare function GenericBaseCMSController<T extends Type<any>>(entity: T, event?: any): any;
export declare function GenericBaseCMSControllerCreator<T extends Type<any>>(config: ControllerConfig, event?: any): any;
