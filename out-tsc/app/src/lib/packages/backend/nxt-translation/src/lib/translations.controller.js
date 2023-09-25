"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
require("reflect-metadata");
const translations_service_1 = require("./translations.service");
let TranslationsController = class TranslationsController {
    constructor(_translationsService) {
        this._translationsService = _translationsService;
    }
    async create(dto) {
        return await this._translationsService.createOrUpdate(dto);
    }
};
exports.TranslationsController = TranslationsController;
tslib_1.__decorate([
    (0, common_1.Post)('update'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TranslationsController.prototype, "create", null);
exports.TranslationsController = TranslationsController = tslib_1.__decorate([
    (0, common_1.Controller)('translations'),
    (0, swagger_1.ApiTags)('Translations'),
    tslib_1.__metadata("design:paramtypes", [translations_service_1.TranslationsService])
], TranslationsController);
//# sourceMappingURL=translations.controller.js.map