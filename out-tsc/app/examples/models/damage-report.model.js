"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DamageReport = void 0;
const tslib_1 = require("tslib");
const generic_types_1 = require("@nxtlvls/generic-types");
const tire_guarantee_model_1 = require("./tire-guarantee.model");
const typeorm_1 = require("typeorm");
let DamageReport = class DamageReport {
};
exports.DamageReport = DamageReport;
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'TEXT' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    tslib_1.__metadata("design:type", Number)
], DamageReport.prototype, "id", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'TEXT', required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", String)
], DamageReport.prototype, "profile_left", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'FILE', required: true }),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DamageReport.prototype, "damage_image_id", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'TEXTAREA', required: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    tslib_1.__metadata("design:type", String)
], DamageReport.prototype, "description", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'RADIO', required: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    tslib_1.__metadata("design:type", String)
], DamageReport.prototype, "damage_type", void 0);
tslib_1.__decorate([
    (0, generic_types_1.FormField)({ type: 'TEXT' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", String)
], DamageReport.prototype, "damage_type_other", void 0);
tslib_1.__decorate([
    (0, generic_types_1.FormField)({ type: 'FILE', required: true }),
    tslib_1.__metadata("design:type", Number)
], DamageReport.prototype, "new_tire_invoice_id", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'SIGN', options: { image_transparent: true } }),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DamageReport.prototype, "signature_field_id", void 0);
tslib_1.__decorate([
    (0, generic_types_1.FormField)({ type: 'TEXT', required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", String)
], DamageReport.prototype, "state", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'DATE', required: true }),
    (0, typeorm_1.UpdateDateColumn)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Object)
], DamageReport.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({ type: 'DATE', required: true }),
    (0, typeorm_1.CreateDateColumn)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Object)
], DamageReport.prototype, "updated_at", void 0);
tslib_1.__decorate([
    (0, generic_types_1.Field)({
        type: 'RELATION',
        options: {
            selector: 'tireGuarantee.id',
            detail_fields: [
                'tireGuarantee.licence_plate',
                'tireGuarantee.dealer_name',
                'tireGuarantee.dealer_postcode',
                'tireGuarantee.purchase_date',
                'tireGuarantee.invoice_number',
            ],
            model: new tire_guarantee_model_1.TireGuarantee(),
        },
    }),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DamageReport.prototype, "tire_guarantee_id", void 0);
tslib_1.__decorate([
    (0, generic_types_1.FormField)({ type: 'TEXT', required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", String)
], DamageReport.prototype, "bank_name", void 0);
tslib_1.__decorate([
    (0, generic_types_1.FormField)({ type: 'TEXT', required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", String)
], DamageReport.prototype, "iban", void 0);
tslib_1.__decorate([
    (0, generic_types_1.FormField)({ type: 'TEXT', required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", String)
], DamageReport.prototype, "bic", void 0);
tslib_1.__decorate([
    (0, generic_types_1.FormField)({ type: 'TEXT', required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    tslib_1.__metadata("design:type", String)
], DamageReport.prototype, "account_holder", void 0);
exports.DamageReport = DamageReport = tslib_1.__decorate([
    (0, generic_types_1.Model)({
        name: 'damage-reports',
        url: 'damage-reports',
        label: 'Schadensmeldung',
        features: ['base', 'notification'],
    })
], DamageReport);
//# sourceMappingURL=damage-report.model.js.map