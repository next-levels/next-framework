import 'reflect-metadata';
import { FilesService } from './files.service';
import { FileDto } from './dtos/file.dto';
import { UpdateFileDto } from './dtos/update-file.dto';
import { FileEntity } from './entities/file.entity';
import 'reflect-metadata';
import { ThumbnailService } from './thumbnail.service';
import { Response as ExpressResponse } from 'express';
import { Result } from '../../../nest-tools/src';
export declare class FilesController {
    private readonly _filesService;
    private readonly _thumbnailService;
    constructor(_filesService: FilesService, _thumbnailService: ThumbnailService);
    serveLocalFile(id: number, res: Response): Promise<Result<void>>;
    serveThumbnail(id: number, width: string, height: string, type: string, res: ExpressResponse): Promise<Result<void>>;
    downloadFile(id: number, res: ExpressResponse): Promise<Result<void>>;
    uploadFile(file: any, attachmentType: string, attachmentId: number, fieldName: string, dto: Partial<UpdateFileDto>): Promise<Result<Promise<FileEntity>>>;
    create(dto: Partial<FileDto>, file: any): Promise<Result<FileEntity>>;
    createAsUnknown(dto: Partial<FileDto>, file: any): Promise<Result<FileEntity>>;
    createAsUnknownBase64(dto: Partial<FileDto>, base64: string, mime: string, type: string): Promise<Result<FileEntity>>;
    uploadFileFrontend(file: any, req: any, fieldName: string, dto: Partial<UpdateFileDto>): Promise<Result<Promise<FileEntity>>>;
    uploadFileFrontendBase64(base64: string, req: any, fieldName: string, dto: Partial<UpdateFileDto>): Promise<Result<Promise<FileEntity>>>;
    createAsUser(dto: Partial<FileDto>, file: any): Promise<Result<FileEntity>>;
    update(dto: FileDto): Promise<Result<FileEntity>>;
    delete(id: number): Promise<Result<unknown>>;
}
