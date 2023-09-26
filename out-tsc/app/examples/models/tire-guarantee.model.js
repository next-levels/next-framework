"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TireGuarantee = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const generic_types_1 = require("@nxtlvls/generic-types");
let TireGuarantee = class TireGuarantee {
};
exports.TireGuarantee = TireGuarantee;
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'TEXT' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    tslib_1.__metadata("design:type", Number)
], TireGuarantee.prototype, "id", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'DATE' }),
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", String)
], TireGuarantee.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", String)
], TireGuarantee.prototype, "updated_at", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({
        type: 'RELATION',
        options: {
            selector: 'user.first_name',
            detail_fields: [
                'user.first_name',
                'user.last_name',
                'user.email',
                'user.country',
            ],
        },
    }),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], TireGuarantee.prototype, "user_id", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'TEXT', required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", String)
], TireGuarantee.prototype, "licence_plate", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({
        type: 'RELATION',
        required: true,
        options: { map: 'tire_variant.tireId' },
    }),
    tslib_1.__metadata("design:type", Number)
], TireGuarantee.prototype, "tireId", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({
        type: 'RELATION',
        required: true,
        options: { selector: 'tire_variant.article_number' },
    }),
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], TireGuarantee.prototype, "tire_variant_id", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'TEXT', required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", String)
], TireGuarantee.prototype, "dealer_name", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'TEXT', required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", String)
], TireGuarantee.prototype, "dealer_postcode", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'DATE', required: true }),
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", String)
], TireGuarantee.prototype, "purchase_date", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'FILE', required: true }),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], TireGuarantee.prototype, "invoice_id", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'TEXT', required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", String)
], TireGuarantee.prototype, "invoice_number", void 0);
tslib_1.__decorate([
    (0, generic_types_1.FormField)({
        type: 'RELATION',
    }),
    tslib_1.__metadata("design:type", Number)
], TireGuarantee.prototype, "damageReports_id", void 0);
exports.TireGuarantee = TireGuarantee = tslib_1.__decorate([
    (0, generic_types_1.Model)({
        name: 'tire-guarantee',
        label: 'Reifen-Garantie',
        features: ['base', 'notification'],
        url: 'tire-guarantee',
    })
], TireGuarantee);
//# sourceMappingURL=tire-guarantee.model.js.map