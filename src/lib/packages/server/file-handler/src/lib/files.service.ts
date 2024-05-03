import 'reflect-metadata';
import * as fs from 'fs';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Connection, Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileDto } from './dtos/file.dto';
import { UpdateFileDto } from './dtos/update-file.dto';
import { FileEntity } from './entities/file.entity';
import { FILE_FIELD_METADATA_KEY } from './decoretors/file-field.decorator';
import { ErrorCode, Result } from '../../../nest-tools/src';

@Injectable()
export class FilesService {
  public readonly entitiesWithFileFields: Map<string, any>;

  constructor(
    @InjectRepository(FileEntity)
    private readonly _filesRepository: Repository<FileEntity>,
    private readonly connection: Connection
  ) {
    this.entitiesWithFileFields = this.findClassesWithFileFields();
  }

  private findClassesWithFileFields(): Map<string, any> {
    const entities = new Map<string, any>();

    this.connection.entityMetadatas.forEach((metadata) => {
      const Entity = metadata.target;
      if (typeof Entity === 'function') {
        let className = metadata.name.toLowerCase();
        className = className.replace('entity', '');

        const fileFields = Reflect.getMetadata(
          FILE_FIELD_METADATA_KEY,
          Entity.prototype
        );

        if (fileFields) {
          entities.set(className, Entity);
        }
      }
    });

    return entities;
  }

  /**
   * Find local file by id
   *
   * @param id
   * @returns
   */
  public async findOne(id: number): Promise<FileEntity | null> {
    return await this._filesRepository.findOneBy({ id: id });
  }

  /**
   * Find all local files
   *
   * @returns
   */
  public async findAll(): Promise<FileEntity[]> {
    return await this._filesRepository.find();
  }

  /**
   * Find all local files by given query
   *
   * @param query
   * @returns
   */
  public async findByFilter(
    query: PaginateQuery
  ): Promise<Paginated<FileEntity>> {
    return await paginate(query, this._filesRepository, {
      sortableColumns: [
        'id',
        'name',
        'mime_type',
        'path',
        'created_at',
        'updated_at',
      ],
      searchableColumns: ['name', 'mime_type', 'path'],
      defaultSortBy: [['id', 'DESC']],
    });
  }

  /**
   * Create new file
   * @param createFileDto
   * @returns
   */
  public async create(createFileDto: FileDto): Promise<Result<FileEntity>> {
    return Result.ok(await this._filesRepository.save(createFileDto));
  }

  async createOrUpdate(
    file: Express.Multer.File,
    attachmentType: string,
    attachmentId: number,
    fieldName: string,
    dto: UpdateFileDto
  ): Promise<Result<Promise<FileEntity>>> {
    const attachmentObject = this.entitiesWithFileFields.get(attachmentType);
    if (!attachmentObject) {
      throw new Error(
        `Entity not found for attachmentType: ${attachmentType} ${this.entitiesWithFileFields}`
      );
    }

    const fileFields =
      Reflect.getMetadata(
        FILE_FIELD_METADATA_KEY,
        attachmentObject.prototype
      ) || [];
    const fieldData = fileFields.find((field) => field.fieldName === fieldName);

    if (!fieldData.multi) {
      await this._filesRepository.delete({
        attachment_type: attachmentType,
        attachment_id: attachmentId,
        field_name: fieldName,
      });
    }

    let newFile = new FileEntity();
    if (file) {
      newFile = FileDto.fromFile(file);
    }

    newFile.attachment_type = attachmentType;
    newFile.attachment_id = attachmentId;
    newFile.field_name = fieldName;
    newFile.sort_order = dto.sort_order;
    newFile.brightness = dto.brightness;
    newFile.description = dto.description;

    return Result.ok(this._filesRepository.save(newFile));
  }

  async findFilesByObject(
    attachmentType: string,
    attachmentId: number
  ): Promise<FileEntity[]> {
    return await this._filesRepository.find({
      where: {
        attachment_type: attachmentType,
        attachment_id: attachmentId,
      },
      order: {
        sort_order: 'ASC',
      },
    });
  }

  /**
   * Create from File
   * @param file
   * @returns
   */
  public async createFromFile(
    file?: Express.Multer.File
  ): Promise<Result<FileEntity>> {
    let dto = new FileDto();
    if (file) {
      dto = FileDto.fromFile(file);
    }
    return Result.ok(await this._filesRepository.save(dto));
  }

  /**
   * Create new local file from url
   *
   * @param localFile
   * @returns
   */
  // public async createFromUrl(filePath: string, url: any): Promise<FileEntity> {
  //   return;
  // } // So far unused

  /**
   * Update a file
   * @param updateFileDto
   * @returns
   */
  public async update(updateFileDto: FileDto): Promise<Result<FileEntity>> {
    const file = await this.findOne(updateFileDto.id);

    if (!file) {
      return Result.fail(new ErrorCode('File not found', HttpStatus.NOT_FOUND));
    }

    return Result.ok(
      await this._filesRepository.save({
        ...updateFileDto,
      })
    );
  }

  /**
   * Remove local file
   *
   * @param file
   */
  public async remove(file: FileEntity): Promise<Result<unknown>> {
    if (file) {
      fs.unlinkSync('uploads' + '/' + file.path?.replace('uploads/', ''));
    }
    await this._filesRepository.delete(file.id);
    return Result.ok();
  }

  /**
   * Stream file from uploads to frontend
   *
   * @param id
   * @param hash
   * @param res
   */
  public async serveFile(id: number, res: any): Promise<Result<void>> {
    const file = await this._filesRepository.findOne({
      where: { id },
    });

    if (!file) {
      return Result.fail(new ErrorCode('FILE_NOT_FOUND', HttpStatus.NOT_FOUND));
    }

    res.sendFile('uploads' + '/' + file.path.replace('uploads/', ''), {
      root: './',
    });

    return Result.ok();
  }

  public getMimeTypeFromBase64(base64: string): string {
    const signatures = {
      J: 'pdf',
      R: 'gif',
      i: 'png',
      U: 'webp',
      '/': 'jpg',
    };

    for (const s in signatures) {
      if (base64.indexOf(s) === 0) {
        return signatures[s];
      }
    }

    return '';
  }

  async createExternal(file: FileEntity) {
    return Result.ok(this._filesRepository.save(file));
  }

  /**
   * Remove external file
   *
   * @param file
   */
  public async removeExternal(file: FileEntity): Promise<Result<unknown>> {
    await this._filesRepository.delete(file.id);
    return Result.ok();
  }
}
