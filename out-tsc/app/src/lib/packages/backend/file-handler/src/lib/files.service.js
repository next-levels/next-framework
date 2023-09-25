"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const fs = require("fs");
const nestjs_paginate_1 = require("nestjs-paginate");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const file_dto_1 = require("./dtos/file.dto");
const file_entity_1 = require("./entities/file.entity");
const file_field_decorator_1 = require("./decoretors/file-field.decorator");
const src_1 = require("../../../nest-tools/src");
let FilesService = class FilesService {
    constructor(_filesRepository, connection) {
        this._filesRepository = _filesRepository;
        this.connection = connection;
        this.entitiesWithFileFields = this.findClassesWithFileFields();
    }
    findClassesWithFileFields() {
        const entities = new Map();
        this.connection.entityMetadatas.forEach((metadata) => {
            const Entity = metadata.target;
            if (typeof Entity === 'function') {
                let className = metadata.name.toLowerCase();
                className = className.replace('entity', '');
                const fileFields = Reflect.getMetadata(file_field_decorator_1.FILE_FIELD_METADATA_KEY, Entity.prototype);
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
    async findOne(id) {
        return await this._filesRepository.findOneBy({ id: id });
    }
    /**
     * Find all local files
     *
     * @returns
     */
    async findAll() {
        return await this._filesRepository.find();
    }
    /**
     * Find all local files by given query
     *
     * @param query
     * @returns
     */
    async findByFilter(query) {
        return await (0, nestjs_paginate_1.paginate)(query, this._filesRepository, {
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
    async create(createFileDto) {
        return src_1.Result.ok(await this._filesRepository.save(createFileDto));
    }
    async createOrUpdate(file, attachmentType, attachmentId, fieldName, dto) {
        const attachmentObject = this.entitiesWithFileFields.get(attachmentType);
        if (!attachmentObject) {
            throw new Error(`Entity not found for attachmentType: ${attachmentType}`);
        }
        const fileFields = Reflect.getMetadata(file_field_decorator_1.FILE_FIELD_METADATA_KEY, attachmentObject.prototype) || [];
        const fieldData = fileFields.find((field) => field.fieldName === fieldName);
        if (!fieldData.multi) {
            await this._filesRepository.delete({
                attachment_type: attachmentType,
                attachment_id: attachmentId,
                field_name: fieldName,
            });
        }
        let newFile = new file_entity_1.FileEntity();
        if (file) {
            newFile = file_dto_1.FileDto.fromFile(file);
        }
        newFile.attachment_type = attachmentType;
        newFile.attachment_id = attachmentId;
        newFile.field_name = fieldName;
        newFile.sort_order = dto.sort_order;
        newFile.brightness = dto.brightness;
        newFile.description = dto.description;
        return src_1.Result.ok(this._filesRepository.save(newFile));
    }
    async findFilesByObject(attachmentType, attachmentId) {
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
    async createFromFile(file) {
        let dto = new file_dto_1.FileDto();
        if (file) {
            dto = file_dto_1.FileDto.fromFile(file);
        }
        return src_1.Result.ok(await this._filesRepository.save(dto));
    }
    /**
     * Create new local file from url
     *
     * @param localFile
     * @returns
     */
    async createFromUrl(filePath, url) {
        return;
    }
    /**
     * Update a file
     * @param updateFileDto
     * @returns
     */
    async update(updateFileDto) {
        const file = await this.findOne(updateFileDto.id);
        if (!file) {
            return src_1.Result.fail(new src_1.ErrorCode('File not found', common_1.HttpStatus.NOT_FOUND));
        }
        return src_1.Result.ok(await this._filesRepository.save({
            ...updateFileDto,
        }));
    }
    /**
     * Remove local file
     *
     * @param file
     */
    async remove(file) {
        if (file) {
            fs.unlinkSync('uploads' + '/' + file.path?.replace('uploads/', ''));
        }
        await this._filesRepository.delete(file.id);
        return src_1.Result.ok();
    }
    /**
     * Stream file from uploads to frontend
     *
     * @param id
     * @param hash
     * @param res
     */
    async serveFile(id, res) {
        const file = await this._filesRepository.findOne({
            where: { id },
        });
        if (!file) {
            return src_1.Result.fail(new src_1.ErrorCode('FILE_NOT_FOUND', common_1.HttpStatus.NOT_FOUND));
        }
        res.sendFile('uploads' + '/' + file.path.replace('uploads/', ''), {
            root: './',
        });
        return src_1.Result.ok();
    }
    getMimeTypeFromBase64(base64) {
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
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_2.InjectRepository)(file_entity_1.FileEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Connection])
], FilesService);
//# sourceMappingURL=files.service.js.map