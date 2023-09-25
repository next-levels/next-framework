"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let TranslationEntity = class TranslationEntity {
};
exports.TranslationEntity = TranslationEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TranslationEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    tslib_1.__metadata("design:type", String)
], TranslationEntity.prototype, "model_type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], TranslationEntity.prototype, "model_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    tslib_1.__metadata("design:type", String)
], TranslationEntity.prototype, "lang", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    tslib_1.__metadata("design:type", String)
], TranslationEntity.prototype, "content", void 0);
exports.TranslationEntity = TranslationEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('nxt_translations')
], TranslationEntity);
//# sourceMappingURL=translation.entity.js.map