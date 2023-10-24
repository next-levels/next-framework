import { HttpException } from '@nestjs/common';

export interface LocalOptions {
  dest?: string;
  isOptional?: boolean;
  fileFilter?(
    req: any,
    file: {
      original_name: string;
      encoding: string;
      mime_type: string;
      size: number;
      data: string;
    }
  ): HttpException | true;
}
