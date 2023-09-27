/// <reference types="node" />
/// <reference types="node" />
import { Readable } from 'stream';
import { FileEntity } from './entities/file.entity';
import { Response } from 'express';
import { Result } from '../../../nest-tools/src';
export declare class ThumbnailService {
    constructor();
    serveThumbnail(file: FileEntity, res: Response, width: string, height: string, type?: string): Promise<Result<void>>;
    createPNG(buffer: Buffer, width: number, height: number): Promise<Buffer>;
    createJPEG(buffer: Buffer, width: number, height: number): Promise<Buffer>;
    bufferToReadableStream(buffer: Buffer): Readable;
    fileToBuffer(file: FileEntity): Promise<Buffer>;
    downloadFile(file: FileEntity, res: Response): Promise<Result<void>>;
}
