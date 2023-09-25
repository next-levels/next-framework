"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericBaseCMSService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
const fields_helper_1 = require("../../../helpers/fields.helper");
const service_type_1 = require("../../../types/service.type");
const result_1 = require("src/lib/packages/backend/nest-tools/src/lib/return/result");
function GenericBaseCMSService(entity) {
    let GenericServiceHost = class GenericServiceHost extends service_type_1.BaseApiService {
        constructor(repository) {
            super();
            this.repository = repository;
        }
        async create(data) {
            return result_1.Result.ok(await this.saveWithRelations(data));
        }
        async delete(id) {
            return result_1.Result.ok(await this.repository.delete(id));
        }
        async findAll() {
            return result_1.Result.ok(await this.repository.find());
        }
        async findByFilter(query) {
            return this._findByFilter(query);
        }
        async _findByFilter(query) {
            const relationFields = this.repository.metadata.relations.map((relation) => relation.propertyName);
            const filterableColumns = relationFields.reduce((acc, field) => {
                acc[field + '_id'] = [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.GT];
                return acc;
            }, {});
            const allColumnNames = this.repository.metadata.columns.map((column) => column.propertyName);
            const filterFields = (0, fields_helper_1.getFilterFields)(entity).filter((field) => allColumnNames.includes(field));
            let repo = this.repository.createQueryBuilder('entity');
            for (const field of relationFields) {
                repo = repo.leftJoinAndSelect(`entity.${field}`, field);
            }
            return result_1.Result.ok(await (0, nestjs_paginate_1.paginate)(query, repo, {
                sortableColumns: filterFields,
                searchableColumns: filterFields,
                filterableColumns: filterableColumns,
                maxLimit: 0,
            }));
        }
        findOne(id) {
            return Promise.resolve(undefined);
        }
        update(id, data) {
            return Promise.resolve(undefined);
        }
        async saveWithRelations(entity) {
            const newEntity = await this.repository.save(entity);
            const relationFields = this.repository.metadata.relations.map((relation) => relation.propertyName);
            // Step 2: Fetch it back with relations
            return this.repository.findOne({
                where: { id: newEntity.id },
                relations: relationFields, // Include the relations you want
            });
        }
    };
    GenericServiceHost = tslib_1.__decorate([
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entity)),
        tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
    ], GenericServiceHost);
    return GenericServiceHost;
}
exports.GenericBaseCMSService = GenericBaseCMSService;
//# sourceMappingURL=service.factory.js.map