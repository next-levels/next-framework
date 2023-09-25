"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericBaseCMSControllerCreator = exports.GenericBaseCMSController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_paginate_1 = require("nestjs-paginate");
const controller_type_1 = require("../../../types/controller.type");
const file_handler_1 = require("@nxtlvls/file-handler");
const meta_data_helper_1 = require("src/lib/packages/shared/generics/src/lib/helpers/meta-data.helper");
const jwt_auth_guard_1 = require("src/lib/packages/backend/nest-commons/src/lib/guards/jwt-auth.guard");
function GenericBaseCMSController(entity, event = null) {
    let GenericControllerHost = class GenericControllerHost extends controller_type_1.BaseApiController {
        constructor(service) {
            super();
            this.service = service;
        }
        async frontendFindAll(country) {
            return await this.service.findAll();
        }
        async findByFilter(query, req) {
            return await this.service.findByFilter(query, req.user.userId);
        }
        async create(dto) {
            const result = await this.service.create(dto);
            const options = meta_data_helper_1.META.getOptionsByModel(new entity());
            let name = '';
            if (options) {
                name = options.name;
            }
            if (event !== null) {
                event.emit('events:' + name, {
                    method: 'post',
                    data: result.getValue(),
                });
            }
            return result;
        }
        async remove(id) {
            return await this.service.delete(id);
        }
        async frontendFindOne(id) {
            return await this.service.findOne(id);
        }
    };
    tslib_1.__decorate([
        (0, common_1.Get)('frontend'),
        (0, common_1.UseInterceptors)(file_handler_1.FileInjectInterceptor),
        tslib_1.__param(0, (0, common_1.Query)('country')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericControllerHost.prototype, "frontendFindAll", null);
    tslib_1.__decorate([
        (0, common_1.UseInterceptors)(file_handler_1.FileInjectInterceptor),
        (0, common_1.Get)('filter'),
        (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false }),
        (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false }),
        (0, swagger_1.ApiQuery)({
            name: 'sortBy',
            type: String,
            required: false,
            description: 'Example: sortBy=name:ASC,price:DESC',
        }),
        (0, swagger_1.ApiQuery)({
            name: 'searchBy',
            type: String,
            required: false,
            description: 'Example: searchBy=name,price',
        }),
        (0, swagger_1.ApiQuery)({ name: 'search', type: String, required: false }),
        (0, swagger_1.ApiQuery)({
            name: 'filter',
            type: String,
            required: false,
            description: 'Example: filter.name=$eq:Milo&filter.price=$btw:4,6',
        }),
        tslib_1.__param(0, (0, nestjs_paginate_1.Paginate)()),
        tslib_1.__param(1, (0, common_1.Req)()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericControllerHost.prototype, "findByFilter", null);
    tslib_1.__decorate([
        (0, common_1.Post)(),
        (0, swagger_1.ApiBody)({ type: entity }),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericControllerHost.prototype, "create", null);
    tslib_1.__decorate([
        (0, common_1.Delete)(':id'),
        tslib_1.__param(0, (0, common_1.Param)('id')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericControllerHost.prototype, "remove", null);
    tslib_1.__decorate([
        (0, common_1.Get)(':id'),
        (0, common_1.UseInterceptors)(file_handler_1.FileInjectInterceptor),
        tslib_1.__param(0, (0, common_1.Param)('id')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericControllerHost.prototype, "frontendFindOne", null);
    GenericControllerHost = tslib_1.__decorate([
        (0, common_1.Controller)(),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], GenericControllerHost);
    return GenericControllerHost;
}
exports.GenericBaseCMSController = GenericBaseCMSController;
function GenericBaseCMSControllerCreator(config, event = null) {
    let GenericControllerHost = class GenericControllerHost extends GenericBaseCMSController(config.entity, event) {
        constructor(service) {
            super(service);
            this.service = service;
        }
    };
    GenericControllerHost = tslib_1.__decorate([
        (0, common_1.Controller)(config.route + '/admin/'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        tslib_1.__param(0, (0, common_1.Inject)(config.serviceToken)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], GenericControllerHost);
    return GenericControllerHost;
}
exports.GenericBaseCMSControllerCreator = GenericBaseCMSControllerCreator;
//# sourceMappingURL=controller.factory.js.map