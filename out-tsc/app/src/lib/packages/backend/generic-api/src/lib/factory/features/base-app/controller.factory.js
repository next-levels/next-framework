"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericBaseApiControllerCreator = exports.GenericBaseApiController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_paginate_1 = require("nestjs-paginate");
const controller_type_1 = require("../../../types/controller.type");
const file_handler_1 = require("@nxtlvls/file-handler");
const nest_commons_1 = require("@nxtlvls/nest-commons");
const meta_data_helper_1 = require("src/lib/packages/shared/generics/src/lib/helpers/meta-data.helper");
function GenericBaseApiController(entity, event = null) {
    let GenericControllerHost = class GenericControllerHost extends controller_type_1.BaseApiController {
        constructor(service) {
            super();
            this.service = service;
        }
        async frontendFindAll(req, country) {
            return await this.service.findAll(req);
        }
        async findByFilter(query, req, country) {
            return await this.service.findByFilter(query, country, req);
        }
        async findOne(id, req) {
            return await this.service.findOne(id, req);
        }
        async create(data, req) {
            const result = await this.service.create(data, req);
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
        async remove(id, req) {
            return await this.service.delete(id, req);
        }
    };
    tslib_1.__decorate([
        (0, common_1.Get)(),
        (0, common_1.UseInterceptors)(file_handler_1.FileInjectInterceptor),
        tslib_1.__param(0, (0, common_1.Request)()),
        tslib_1.__param(1, (0, common_1.Query)('country')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, String]),
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
        tslib_1.__param(2, (0, common_1.Query)('country')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, String]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericControllerHost.prototype, "findByFilter", null);
    tslib_1.__decorate([
        (0, common_1.Get)(':id'),
        (0, common_1.UseInterceptors)(file_handler_1.FileInjectInterceptor),
        tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        tslib_1.__param(1, (0, common_1.Req)()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericControllerHost.prototype, "findOne", null);
    tslib_1.__decorate([
        (0, common_1.Post)(),
        (0, swagger_1.ApiBody)({ type: entity }),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__param(1, (0, common_1.Req)()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericControllerHost.prototype, "create", null);
    tslib_1.__decorate([
        (0, common_1.Delete)(':id'),
        tslib_1.__param(0, (0, common_1.Param)('id')),
        tslib_1.__param(1, (0, common_1.Req)()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], GenericControllerHost.prototype, "remove", null);
    GenericControllerHost = tslib_1.__decorate([
        (0, common_1.Controller)(),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], GenericControllerHost);
    return GenericControllerHost;
}
exports.GenericBaseApiController = GenericBaseApiController;
function GenericBaseApiControllerCreator(config, event = null) {
    let GenericControllerHost = class GenericControllerHost extends GenericBaseApiController(config.entity, event) {
        constructor(service) {
            super(service);
            this.service = service;
        }
    };
    GenericControllerHost = tslib_1.__decorate([
        (0, common_1.Controller)(config.route + '/user/'),
        (0, common_1.UseGuards)(nest_commons_1.FrontendJwtAuthGuard),
        tslib_1.__param(0, (0, common_1.Inject)(config.serviceToken)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], GenericControllerHost);
    return GenericControllerHost;
}
exports.GenericBaseApiControllerCreator = GenericBaseApiControllerCreator;
//# sourceMappingURL=controller.factory.js.map