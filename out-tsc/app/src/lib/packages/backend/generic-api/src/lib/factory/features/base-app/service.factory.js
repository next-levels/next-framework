"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericBaseApiService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
const service_type_1 = require("./../../../types/service.type");
const fields_helper_1 = require("../../../helpers/fields.helper");
const hook_regestry_1 = require("../../../helpers/hook.regestry");
const result_1 = require("src/lib/packages/backend/nest-tools/src/lib/return/result");
function GenericBaseApiService(entity, registryServiceToken, userScope = false) {
    let GenericServiceHost = class GenericServiceHost extends service_type_1.BaseApiService {
        constructor(repository, hookRegistry) {
            super();
            this.repository = repository;
            this.hookRegistry = hookRegistry;
        }
        getRepoWithScopePipe(req, repo) {
            if (!userScope)
                return repo;
            const scope_field = 'user_id'; // Make sure this is a valid column name and doesn't come directly from user input
            const scope_id = req.user.userId;
            return repo.where(`entity.${scope_field} = :scope_id`, {
                scope_id: scope_id,
            });
        }
        getRepoWithScope(req) {
            if (!userScope)
                return this.repository.createQueryBuilder('entity');
            const scope_field = 'user_id'; // Make sure this is a valid column name and doesn't come directly from user input
            const scope_id = req.user.userId;
            return this.repository
                .createQueryBuilder('entity')
                .where(`entity.${scope_field} = :scope_id`, { scope_id: scope_id });
        }
        async create(data, req) {
            let newData = { user_id: req.user.userId, ...data };
            const beforeHook = this.hookRegistry.getHook(`${entity.name}.before.create`);
            const afterHook = this.hookRegistry.getHook(`${entity.name}.after.create`);
            if (beforeHook) {
                newData = beforeHook(newData);
            }
            const savedData = await this.repository.save(newData);
            if (afterHook) {
                afterHook(savedData);
            }
            return result_1.Result.ok(savedData);
        }
        async delete(id, req) {
            return this.getRepoWithScope(req).softDelete();
        }
        async findAll(req) {
            return result_1.Result.ok(await this.getRepoWithScope(req).getMany());
        }
        async findByFilter(query, country, req) {
            return this._findByFilter(query, country, req);
        }
        async _findByFilter(query, country, req) {
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
            return result_1.Result.ok(await (0, nestjs_paginate_1.paginate)(query, this.getRepoWithScopePipe(req, repo), {
                sortableColumns: filterFields,
                searchableColumns: filterFields,
                filterableColumns: filterableColumns,
                maxLimit: 0,
            }));
        }
        async findOne(id, req) {
            const entity = await this.getRepoWithScope(req)
                .where('id = ' + id)
                .getOne();
            return result_1.Result.ok(entity);
        }
        async update(id, data, req) {
            const entity = await this.getRepoWithScope(req)
                .where('id = ' + id)
                .getOne();
            Object.assign(entity, data);
            const entityNew = await this.repository.save(entity);
            return result_1.Result.ok(entityNew);
        }
    };
    tslib_1.__decorate([
        tslib_1.__param(0, (0, common_1.Request)()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericServiceHost.prototype, "findAll", null);
    tslib_1.__decorate([
        tslib_1.__param(2, (0, common_1.Request)()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericServiceHost.prototype, "findByFilter", null);
    tslib_1.__decorate([
        tslib_1.__param(2, (0, common_1.Request)()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericServiceHost.prototype, "_findByFilter", null);
    tslib_1.__decorate([
        tslib_1.__param(1, (0, common_1.Request)()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericServiceHost.prototype, "findOne", null);
    GenericServiceHost = tslib_1.__decorate([
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entity)),
        tslib_1.__param(1, (0, common_1.Inject)(registryServiceToken)),
        tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
            hook_regestry_1.HookRegistryService])
    ], GenericServiceHost);
    return GenericServiceHost;
}
exports.GenericBaseApiService = GenericBaseApiService;
//# sourceMappingURL=service.factory.js.map