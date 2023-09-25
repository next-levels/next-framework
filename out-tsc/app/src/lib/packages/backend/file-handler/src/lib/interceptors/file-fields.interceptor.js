"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInjectInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nestjs_paginate_1 = require("nestjs-paginate");
require("reflect-metadata");
const rxjs_1 = require("rxjs");
const file_field_decorator_1 = require("../decoretors/file-field.decorator");
const files_service_1 = require("../files.service");
const file_mapping_1 = require("../constants/file-mapping");
const file_helper_1 = require("../file.helper");
const src_1 = require("../../../../nest-tools/src");
let FileInjectInterceptor = class FileInjectInterceptor {
    constructor(filesService) {
        this.filesService = filesService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        if (request.method === 'DELETE') {
            return next.handle();
        }
        return next.handle().pipe((0, rxjs_1.switchMap)(async (data) => {
            if (!data) {
                return data;
            }
            let requestEntity = null;
            let singleEnitiy = false;
            let paginated = null;
            const entitiesWithFileFields = this.filesService.entitiesWithFileFields;
            if (data instanceof src_1.Result) {
                data = data.getValue();
            }
            if (data instanceof nestjs_paginate_1.Paginated) {
                paginated = data;
                data = data.data;
            }
            for (const key in file_mapping_1.fileMapping) {
                if (request.url.includes(key)) {
                    requestEntity = file_mapping_1.fileMapping[key];
                    for (const [key, item] of data.entries()) {
                        data[key] = (0, file_helper_1.convertItem)(item, requestEntity);
                    }
                    break;
                }
            }
            if (!Array.isArray(data)) {
                data = [data];
                singleEnitiy = true;
            }
            for (const item of data) {
                for (const [className, Entity] of entitiesWithFileFields.entries()) {
                    if (item instanceof Entity) {
                        await this.processFileFields(item, className);
                    }
                }
            }
            if (singleEnitiy && data.length > 0) {
                data = data[0];
            }
            if (paginated) {
                paginated.data = data;
                return src_1.Result.ok(paginated);
            }
            return src_1.Result.ok(data);
        }));
    }
    async processFileFields(entity, className) {
        const fileFields = Reflect.getMetadata(file_field_decorator_1.FILE_FIELD_METADATA_KEY, entity?.constructor?.prototype);
        if (fileFields && Array.isArray(fileFields)) {
            for (const fileField of fileFields) {
                const files = await this.filesService.findFilesByObject(className, entity.id);
                const matchingFiles = files.filter((file) => file.field_name === fileField.fieldName);
                if (fileField && fileField.multi) {
                    entity[fileField.fieldName] = matchingFiles;
                }
                else {
                    entity[fileField.fieldName] = matchingFiles[0] || null;
                }
            }
        }
    }
};
exports.FileInjectInterceptor = FileInjectInterceptor;
exports.FileInjectInterceptor = FileInjectInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [files_service_1.FilesService])
], FileInjectInterceptor);
//# sourceMappingURL=file-fields.interceptor.js.map