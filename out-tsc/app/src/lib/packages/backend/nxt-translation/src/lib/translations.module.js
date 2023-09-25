"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationsModule = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const translation_entity_1 = require("./entities/translation.entity");
const translations_controller_1 = require("./translations.controller");
const translations_service_1 = require("./translations.service");
let TranslationsModule = class TranslationsModule {
};
exports.TranslationsModule = TranslationsModule;
exports.TranslationsModule = TranslationsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([translation_entity_1.TranslationEntity]), axios_1.HttpModule],
        providers: [translations_service_1.TranslationsService],
        exports: [translations_service_1.TranslationsService],
        controllers: [translations_controller_1.TranslationsController],
    })
], TranslationsModule);
//# sourceMappingURL=translations.module.js.map