"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationsInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
require("reflect-metadata");
const translations_service_1 = require("../translations.service");
const translatable_fields_decorator_1 = require("../decoretors/translatable-fields.decorator");
const translatable_entities_1 = require("../translatable-entities");
const translations_helper_1 = require("../translations.helper");
const result_1 = require("src/lib/packages/backend/nest-tools/src/lib/return/result");
let TranslationsInterceptor = class TranslationsInterceptor {
    constructor(_translationsService) {
        this._translationsService = _translationsService;
    }
    async processTranslation(item, lang, request) {
        const model_type = item.constructor.name;
        const model_id = item.id;
        let translations = await this._translationsService.getTranslations(model_type, model_id, lang);
        const url = request.url;
        const target = (0, translations_helper_1.findNearestEntity)(url, translatable_entities_1.translatableEntities);
        const translatableFields = Reflect.getMetadata(translatable_fields_decorator_1.TRANSLATABLE_FIELDS_METADATA_KEY, target);
        if (!translatableFields) {
            return item;
        }
        if (translations) {
            translations = JSON.parse(translations);
            Object.assign(item, translations);
        }
        return item;
    }
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.switchMap)(async (data) => {
            const request = context.switchToHttp().getRequest();
            const lang = request.headers['nxt-model-lang'];
            if (!lang || !data || lang === 'de') {
                return data;
            }
            const requestData = data.getValue();
            if (Array.isArray(data)) {
                return result_1.Result.ok(await Promise.all(data.map((item) => this.processTranslation(item, lang, request))));
            }
            else if (requestData.data && Array.isArray(requestData.data)) {
                requestData.data = await Promise.all(requestData.data.map((item) => this.processTranslation(item, lang, request)));
                return result_1.Result.ok(requestData);
            }
            else {
                return result_1.Result.ok(await this.processTranslation(requestData, lang, request));
            }
        }));
    }
};
exports.TranslationsInterceptor = TranslationsInterceptor;
exports.TranslationsInterceptor = TranslationsInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [translations_service_1.TranslationsService])
], TranslationsInterceptor);
//# sourceMappingURL=translations-fields.interceptor.js.map