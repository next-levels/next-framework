"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationsUpdateInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
require("reflect-metadata");
const translations_service_1 = require("../translations.service");
const translatable_fields_decorator_1 = require("../decoretors/translatable-fields.decorator");
const translations_helper_1 = require("../translations.helper");
const translatable_entities_1 = require("../translatable-entities");
let TranslationsUpdateInterceptor = class TranslationsUpdateInterceptor {
    constructor(_translationsService) {
        this._translationsService = _translationsService;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { headers, body, method, params } = request;
        if (method !== 'PUT' && method !== 'PATCH') {
            return next.handle();
        }
        const lang = headers['nxt-model-lang'];
        const defaultLang = 'de';
        if (!lang || lang === defaultLang) {
            return next.handle();
        }
        const url = request.url;
        const target = (0, translations_helper_1.findNearestEntity)(url, translatable_entities_1.translatableEntities);
        const translatableFields = Reflect.getMetadata(translatable_fields_decorator_1.TRANSLATABLE_FIELDS_METADATA_KEY, target);
        if (!translatableFields) {
            return next.handle();
        }
        const modelId = parseInt(params.id, 10);
        const modelType = target.name;
        let translation = {};
        for (const field of translatableFields) {
            if (body[field]) {
                translation[field] = body[field];
                delete body[field];
            }
        }
        if (Object.keys(translation).length > 0) {
            translation = JSON.stringify(translation);
            await this._translationsService.addTranslation(lang, modelType, modelId, translation);
        }
        return next.handle();
    }
};
exports.TranslationsUpdateInterceptor = TranslationsUpdateInterceptor;
exports.TranslationsUpdateInterceptor = TranslationsUpdateInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [translations_service_1.TranslationsService])
], TranslationsUpdateInterceptor);
//# sourceMappingURL=translations-update.interceptor.js.map