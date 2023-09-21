"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericBaseApiControllerCreator = exports.GenericBaseApiController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var controller_type_1 = require("../../../types/controller.type");
var file_handler_1 = require("@nxtlvls/file-handler");
var nest_commons_1 = require("@nxtlvls/nest-commons");
var meta_data_helper_1 = require("src/lib/packages/shared/generics/src/lib/helpers/meta-data.helper");
function GenericBaseApiController(entity, event) {
    if (event === void 0) { event = null; }
    var GenericControllerHost = function () {
        var _classDecorators = [(0, common_1.Controller)()];
        var _classDescriptor;
        var _classExtraInitializers = [];
        var _classThis;
        var _classSuper = controller_type_1.BaseApiController;
        var _instanceExtraInitializers = [];
        var _frontendFindAll_decorators;
        var _findByFilter_decorators;
        var _findOne_decorators;
        var _create_decorators;
        var _remove_decorators;
        var GenericControllerHost = _classThis = /** @class */ (function (_super) {
            __extends(GenericControllerHost_1, _super);
            function GenericControllerHost_1(service) {
                var _this = _super.call(this) || this;
                _this.service = (__runInitializers(_this, _instanceExtraInitializers), service);
                return _this;
            }
            GenericControllerHost_1.prototype.frontendFindAll = function (req, country) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.service.findAll(req)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            };
            GenericControllerHost_1.prototype.findByFilter = function (query, req, country) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.service.findByFilter(query, country, req)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            };
            GenericControllerHost_1.prototype.findOne = function (id, req) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.service.findOne(id, req)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            };
            GenericControllerHost_1.prototype.create = function (data, req) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, options, name;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.service.create(data, req)];
                            case 1:
                                result = _a.sent();
                                options = meta_data_helper_1.META.getOptionsByModel(new entity());
                                name = '';
                                if (options) {
                                    name = options.name;
                                }
                                if (event !== null) {
                                    event.emit('events:' + name, {
                                        method: 'post',
                                        data: result.getValue(),
                                    });
                                }
                                return [2 /*return*/, result];
                        }
                    });
                });
            };
            GenericControllerHost_1.prototype.remove = function (id, req) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.service.delete(id, req)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            };
            return GenericControllerHost_1;
        }(_classSuper));
        __setFunctionName(_classThis, "GenericControllerHost");
        (function () {
            var _a;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            _frontendFindAll_decorators = [(0, common_1.Get)(), (0, common_1.UseInterceptors)(file_handler_1.FileInjectInterceptor)];
            _findByFilter_decorators = [(0, common_1.UseInterceptors)(file_handler_1.FileInjectInterceptor), (0, common_1.Get)('filter'), (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false }), (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false }), (0, swagger_1.ApiQuery)({
                    name: 'sortBy',
                    type: String,
                    required: false,
                    description: 'Example: sortBy=name:ASC,price:DESC',
                }), (0, swagger_1.ApiQuery)({
                    name: 'searchBy',
                    type: String,
                    required: false,
                    description: 'Example: searchBy=name,price',
                }), (0, swagger_1.ApiQuery)({ name: 'search', type: String, required: false }), (0, swagger_1.ApiQuery)({
                    name: 'filter',
                    type: String,
                    required: false,
                    description: 'Example: filter.name=$eq:Milo&filter.price=$btw:4,6',
                })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, common_1.UseInterceptors)(file_handler_1.FileInjectInterceptor)];
            _create_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiBody)({ type: entity })];
            _remove_decorators = [(0, common_1.Delete)(':id')];
            __esDecorate(_classThis, null, _frontendFindAll_decorators, { kind: "method", name: "frontendFindAll", static: false, private: false, access: { has: function (obj) { return "frontendFindAll" in obj; }, get: function (obj) { return obj.frontendFindAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _findByFilter_decorators, { kind: "method", name: "findByFilter", static: false, private: false, access: { has: function (obj) { return "findByFilter" in obj; }, get: function (obj) { return obj.findByFilter; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GenericControllerHost = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return GenericControllerHost = _classThis;
    }();
    return GenericControllerHost;
}
exports.GenericBaseApiController = GenericBaseApiController;
function GenericBaseApiControllerCreator(config, event) {
    if (event === void 0) { event = null; }
    var GenericControllerHost = function () {
        var _classDecorators = [(0, common_1.Controller)(config.route + '/user/'), (0, common_1.UseGuards)(nest_commons_1.FrontendJwtAuthGuard)];
        var _classDescriptor;
        var _classExtraInitializers = [];
        var _classThis;
        var _classSuper = GenericBaseApiController(config.entity, event);
        var GenericControllerHost = _classThis = /** @class */ (function (_super) {
            __extends(GenericControllerHost_2, _super);
            function GenericControllerHost_2(service) {
                var _this = _super.call(this, service) || this;
                _this.service = service;
                return _this;
            }
            return GenericControllerHost_2;
        }(_classSuper));
        __setFunctionName(_classThis, "GenericControllerHost");
        (function () {
            var _a;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GenericControllerHost = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return GenericControllerHost = _classThis;
    }();
    return GenericControllerHost;
}
exports.GenericBaseApiControllerCreator = GenericBaseApiControllerCreator;
