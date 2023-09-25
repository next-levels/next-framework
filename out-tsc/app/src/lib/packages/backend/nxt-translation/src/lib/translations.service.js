"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationsService = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const translation_entity_1 = require("./entities/translation.entity");
const translatable_fields_decorator_1 = require("./decoretors/translatable-fields.decorator");
const result_1 = require("../../../nest-tools/src/lib/return/result");
let TranslationsService = class TranslationsService {
    constructor(_translationsRepository, _httpService, connection) {
        this._translationsRepository = _translationsRepository;
        this._httpService = _httpService;
        this.connection = connection;
    }
    /**
     * Find local file by id
     *
     * @param id
     * @returns
     */
    async findOne(id) {
        return await this._translationsRepository.findOneBy({ id: id });
    }
    /**
     * Find all local files
     *
     * @returns
     */
    async findAll() {
        return await this._translationsRepository.find();
    }
    async createOrUpdate(dto) {
        const attachmentObject = this.entitiesWithFileFields.get(dto.model_type);
        if (!attachmentObject) {
            throw new Error(`Entity not found for attachmentType: ${dto.model_type}`);
        }
        const fileFields = Reflect.getMetadata(translatable_fields_decorator_1.TRANSLATE_FIELD_METADATA_KEY, attachmentObject.prototype) || [];
        const newTranslation = new translation_entity_1.TranslationEntity();
        newTranslation.model_type = dto.model_type;
        newTranslation.model_id = dto.model_id;
        newTranslation.lang = dto.lang;
        newTranslation.content = dto.content;
        return result_1.Result.ok(this._translationsRepository.save(newTranslation));
    }
    async addTranslation(lang, model_type, model_id, content) {
        const existingTranslation = await this._translationsRepository.findOne({
            where: { model_type, model_id, lang },
        });
        if (existingTranslation) {
            existingTranslation.content = content;
            return this._translationsRepository.save(existingTranslation);
        }
        else {
            const newTranslation = this._translationsRepository.create({
                lang,
                model_type,
                model_id,
                content,
            });
            return this._translationsRepository.save(newTranslation);
        }
    }
    async getTranslations(model_type, model_id, lang) {
        const translation = await this._translationsRepository.findOne({
            where: { model_type, model_id, lang },
        });
        return translation ? translation.content : '';
    }
};
exports.TranslationsService = TranslationsService;
exports.TranslationsService = TranslationsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_2.InjectRepository)(translation_entity_1.TranslationEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.Repository,
        axios_1.HttpService,
        typeorm_1.Connection])
], TranslationsService);
//# sourceMappingURL=translations.service.js.map