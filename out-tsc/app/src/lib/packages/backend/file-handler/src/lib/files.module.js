"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("./entities/file.entity");
const files_controller_1 = require("./files.controller");
const files_service_1 = require("./files.service");
const thumbnail_service_1 = require("./thumbnail.service");
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([file_entity_1.FileEntity]), axios_1.HttpModule],
        providers: [files_service_1.FilesService, thumbnail_service_1.ThumbnailService],
        exports: [files_service_1.FilesService, thumbnail_service_1.ThumbnailService],
        controllers: [files_controller_1.FilesController],
    })
], FilesModule);
//# sourceMappingURL=files.module.js.map