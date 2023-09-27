import { CanActivate, ExecutionContext } from '@nestjs/common';
import { LocalOptions } from '../local-options.interface';
export declare class FileGuard implements CanActivate {
    private fieldName;
    private localOptions;
    constructor(fieldName: string, localOptions?: LocalOptions);
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
