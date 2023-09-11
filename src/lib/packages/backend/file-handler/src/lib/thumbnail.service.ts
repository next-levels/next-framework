import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { Readable } from 'stream';
import { FileEntity } from './entities/file.entity';
import { ErrorCode, Result } from '@nxtlvls/nest-tools';
import { Response } from 'express';

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

    const fileBuffer = await this.fileToBuffer(file);

    if (!fileBuffer) {
      res.status(404).send('File not found');
      return Result.fail(new ErrorCode('FILE_NOT_FOUND', 404));
    }

    let buffer: Buffer;
    if (fileBuffer && type === 'png') {
      buffer = await this.createPNG(fileBuffer, intWidth, intHeight);
    }
    if (fileBuffer && type === 'jpeg') {
      buffer = await this.createJPEG(fileBuffer, intWidth, intHeight);
    }
    const readable = this.bufferToReadableStream(buffer);

    res.setHeader('Content-Type', 'image/' + type);
    readable.pipe(res);

    return Result.ok();
  }

  async createPNG(
    buffer: Buffer,
    width: number,
    height: number
  ): Promise<Buffer> {
    return await sharp(buffer)
      .resize(width, height, { fit: 'cover' })
      .toFormat('png')
      .toBuffer();
  }

  async createJPEG(
    buffer: Buffer,
    width: number,
    height: number
  ): Promise<Buffer> {
    return await sharp(buffer)
      .resize(width, height, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toBuffer();
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
