/// <reference types="multer" />
import 'reflect-metadata';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Connection, Repository } from 'typeorm';
import { FileDto } from './dtos/file.dto';
import { UpdateFileDto } from './dtos/update-file.dto';
import { FileEntity } from './entities/file.entity';
import { Result } from '../../../nest-tools/src';
export declare class FilesService {
    private readonly _filesRepository;
    private readonly connection;
    readonly entitiesWithFileFields: Map<string, any>;
    constructor(_filesRepository: Repository<FileEntity>, connection: Connection);
    private findClassesWithFileFields;
    /**
     * Find local file by id
     *
     * @param id
     * @returns
     */
    findOne(id: number): Promise<FileEntity | null>;
    /**
     * Find all local files
     *
     * @returns
     */
    findAll(): Promise<FileEntity[]>;
    /**
     * Find all local files by given query
     *
     * @param query
     * @returns
     */
    findByFilter(query: PaginateQuery): Promise<Paginated<FileEntity>>;
    /**
     * Create new file
     * @param createFileDto
     * @returns
     */
    create(createFileDto: FileDto): Promise<Result<FileEntity>>;
    createOrUpdate(file: Express.Multer.File, attachmentType: string, attachmentId: number, fieldName: string, dto: UpdateFileDto): Promise<Result<Promise<FileEntity>>>;
    findFilesByObject(attachmentType: string, attachmentId: number): Promise<FileEntity[]>;
    /**
     * Create from File
     * @param file
     * @returns
     */
    createFromFile(file?: Express.Multer.File): Promise<Result<FileEntity>>;
    /**
     * Create new local file from url
     *
     * @param localFile
     * @returns
     */
    createFromUrl(filePath: string, url: any): Promise<FileEntity>;
    /**
     * Update a file
     * @param updateFileDto
     * @returns
     */
    update(updateFileDto: FileDto): Promise<Result<FileEntity>>;
    /**
     * Remove local file
     *
     * @param file
     */
    remove(file: FileEntity): Promise<Result<unknown>>;
    /**
     * Stream file from uploads to frontend
     *
     * @param id
     * @param hash
     * @param res
     */
    serveFile(id: number, res: any): Promise<Result<void>>;
    getMimeTypeFromBase64(base64: string): string;
}
