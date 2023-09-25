"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const files_service_1 = require("./files.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_helper_1 = require("./file.helper");
const file_dto_1 = require("./dtos/file.dto");
require("reflect-metadata");
const thumbnail_service_1 = require("./thumbnail.service");
const express_1 = require("express");
const src_1 = require("../../../nest-tools/src");
const src_2 = require("../../../nest-commons/src");
let FilesController = class FilesController {
    constructor(_filesService, _thumbnailService) {
        this._filesService = _filesService;
        this._thumbnailService = _thumbnailService;
    }
    async serveLocalFile(id, res) {
        if (!id)
            return src_1.Result.ok();
        return await this._filesService.serveFile(id, res);
    }
    async serveThumbnail(id, width, height, type, res) {
        const file = await this._filesService.findOne(id);
        return await this._thumbnailService.serveThumbnail(file, res, width, height, type);
    }
    async downloadFile(id, res) {
        const file = await this._filesService.findOne(id);
        if (!file) {
            res.status(404).send('File not found');
            return;
        }
        return await this._thumbnailService.downloadFile(file, res);
    }
    async uploadFile(file, attachmentType, attachmentId, fieldName, dto) {
        return await this._filesService.createOrUpdate(file, attachmentType, attachmentId, fieldName, dto);
    }
    async create(dto, file) {
        return await this._filesService.createFromFile(file);
    }
    async createAsUnknown(dto, file) {
        return await this._filesService.createFromFile(file);
    }
    async createAsUnknownBase64(dto, base64, mime, type) {
        const fieldName = Math.random().toString(36).substring(7);
        const file = await (0, file_helper_1.decodeBase64ToFile)(base64, fieldName, mime, type);
        return await this._filesService.createFromFile(file);
    }
    async uploadFileFrontend(file, req, fieldName, dto) {
        return await this._filesService.createOrUpdate(file, 'frontenduser', req.user.userId, fieldName, dto);
    }
    async uploadFileFrontendBase64(base64, req, fieldName, dto) {
        const file = await (0, file_helper_1.decodeBase64ToFile)(base64, fieldName);
        return await this._filesService.createOrUpdate(file, 'frontenduser', req.user.userId, fieldName, dto);
    }
    async createAsUser(dto, file) {
        return await this._filesService.createFromFile(file);
    }
    async update(dto) {
        return this._filesService.update(dto);
    }
    async delete(id) {
        const file = await this._filesService.findOne(id);
        return this._filesService.remove(file);
    }
};
exports.FilesController = FilesController;
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Response]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "serveLocalFile", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/thumb'),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('width')),
    tslib_1.__param(2, (0, common_1.Query)('height')),
    tslib_1.__param(3, (0, common_1.Query)('type')),
    tslib_1.__param(4, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, String, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "serveThumbnail", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/download'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "downloadFile", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload/:attachmentType/:attachmentId/:fieldName'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/tires',
            filename: file_helper_1.editFileName,
        }),
        fileFilter: file_helper_1.imageFileFilter,
    })),
    tslib_1.__param(0, (0, common_1.UploadedFile)()),
    tslib_1.__param(1, (0, common_1.Param)('attachmentType')),
    tslib_1.__param(2, (0, common_1.Param)('attachmentId')),
    tslib_1.__param(3, (0, common_1.Param)('fieldName')),
    tslib_1.__param(4, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Number, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "uploadFile", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(src_2.JwtAuthGuard),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/files',
            filename: file_helper_1.editFileName,
        }),
        fileFilter: file_helper_1.imageFileFilter,
    })),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload/public'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/user',
            filename: file_helper_1.editFileName,
        }),
        fileFilter: file_helper_1.imageFileFilter,
    })),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "createAsUnknown", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload/public/base64'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Body)('base64')),
    tslib_1.__param(2, (0, common_1.Body)('mime')),
    tslib_1.__param(3, (0, common_1.Body)('type')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "createAsUnknownBase64", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(src_2.FrontendJwtAuthGuard),
    (0, common_1.Post)('upload/frontend/:fieldName'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/frontenduser',
            filename: file_helper_1.editFileName,
        }),
        fileFilter: file_helper_1.imageFileFilter,
    })),
    tslib_1.__param(0, (0, common_1.UploadedFile)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__param(2, (0, common_1.Param)('fieldName')),
    tslib_1.__param(3, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "uploadFileFrontend", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(src_2.FrontendJwtAuthGuard),
    (0, common_1.Post)('upload/base64/:fieldName'),
    tslib_1.__param(0, (0, common_1.Body)('base64')),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__param(2, (0, common_1.Param)('fieldName')),
    tslib_1.__param(3, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "uploadFileFrontendBase64", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(src_2.FrontendJwtAuthGuard),
    (0, common_1.Post)('upload/frontend'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/user',
            filename: file_helper_1.editFileName,
        }),
        fileFilter: file_helper_1.imageFileFilter,
    })),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "createAsUser", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(src_2.JwtAuthGuard),
    (0, common_1.Patch)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [file_dto_1.FileDto]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(src_2.JwtAuthGuard),
    (0, common_1.Delete)(),
    tslib_1.__param(0, (0, common_1.Query)('id', common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "delete", null);
exports.FilesController = FilesController = tslib_1.__decorate([
    (0, common_1.Controller)('files'),
    (0, swagger_1.ApiTags)('Files'),
    tslib_1.__metadata("design:paramtypes", [files_service_1.FilesService,
        thumbnail_service_1.ThumbnailService])
], FilesController);
//# sourceMappingURL=files.controller.js.map