import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { ErrorCode, Result } from '../../../nest-tools';
import { FastifyReply } from 'fastify';
import { FileEntity } from '../lib/entities/file.entity';

const sharp = require('sharp');

@Injectable()
export class FastifyThumbnailService {
  constructor() {}

  async serveThumbnail(
    file: FileEntity,
    reply: FastifyReply,
    width: string,
    height: string,
    type = 'png'
  ): Promise<Result<void>> {
    const intWidth = parseInt(width);
    const intHeight = parseInt(height);
    const fileBuffer = await this.fileToBuffer(file);

    if (!fileBuffer) {
      reply.code(404).send('File not found');
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

    reply.type('image/' + type);
    reply.send(readable);

    return Result.ok();
  }

  async createJPEG(
    buffer: Buffer,
    width: number,
    height: number
  ): Promise<Buffer> {
    return await sharp(buffer)
      .resize(width, height, { fit: 'cover' })
      .toFormat('jpg')
      .toBuffer();
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

  async downloadFile(
    file: FileEntity,
    reply: FastifyReply
  ): Promise<Result<void>> {
    const fileBuffer = await this.fileToBuffer(file);
    const readable = this.bufferToReadableStream(fileBuffer);

    reply.header('Content-Disposition', `attachment; filename="${file.name}"`);
    reply.type(file.mime_type);
    reply.send(readable);

    return Result.ok();
  }

  async serveFile(
    file: FileEntity,
    reply: FastifyReply
  ): Promise<Result<void>> {
    const fileBuffer = await this.fileToBuffer(file);
    const readable = this.bufferToReadableStream(fileBuffer);

    reply.header('filename', `${file.name}`);
    reply.type(file.mime_type);
    reply.send(readable);

    return Result.ok();
  }
}
