import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { FileEntity } from './entities/file.entity';
import { Response } from 'express';
import { ErrorCode, Result } from '../../../nest-tools';

@Injectable()
export class ThumbnailService {
  constructor() {}

  async serveThumbnail(
    file: FileEntity,
    res: Response,
    width: string,
    height: string,
    type = 'png'
  ): Promise<Result<void>> {
    const intWidth = parseInt(width);
    const intHeight = parseInt(height);


    return Result.ok();
  }



  bufferToReadableStream(buffer: Buffer): Readable {
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    return readableStream;
  }

  async fileToBuffer(file: FileEntity) {
    try {
      const path = 'uploads' + '/' + file.path.replace('uploads/', '');

      const data = await fs.readFile(path);
      return data;
    } catch (error) {
      return null;
    }
  }

  async downloadFile(file: FileEntity, res: Response): Promise<Result<void>> {
    const fileBuffer = await this.fileToBuffer(file);
    const readable = this.bufferToReadableStream(fileBuffer);

    res.setHeader('Content-Type', file.mime_type);
    res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
    readable.pipe(res);

    return Result.ok();
  }
}
