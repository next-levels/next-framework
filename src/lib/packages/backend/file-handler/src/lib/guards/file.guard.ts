import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { LocalOptions } from '../local-options.interface';

export class FileGuard implements CanActivate {
  private fieldName: string;
  private localOptions: LocalOptions;

  constructor(
    fieldName: string,
    localOptions: LocalOptions = { isOptional: false }
  ) {
    this.fieldName = fieldName;
    this.localOptions = localOptions;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request?.body;
    const file = body[this.fieldName];

    if (!file && !this.localOptions.isOptional) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    return true;
  }
}
