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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.GenericBaseApiService = void 0;
var common_1 = require("@nestjs/common");
var nestjs_paginate_1 = require("nestjs-paginate");
var service_type_1 = require("./../../../types/service.type");
var fields_helper_1 = require("../../../helpers/fields.helper");
var result_1 = require("src/lib/packages/backend/nest-tools/src/lib/return/result");
function GenericBaseApiService(entity, registryServiceToken, userScope) {
    if (userScope === void 0) { userScope = false; }
    var GenericServiceHost = function () {
        var _classDecorators = [(0, common_1.Injectable)()];
        var _classDescriptor;
        var _classExtraInitializers = [];
        var _classThis;
        var _classSuper = service_type_1.BaseApiService;
        var _instanceExtraInitializers = [];
        var _findAll_decorators;
        var _findByFilter_decorators;
        var __findByFilter_decorators;
        var _findOne_decorators;
        var GenericServiceHost = _classThis = /** @class */ (function (_super) {
            __extends(GenericServiceHost_1, _super);
            function GenericServiceHost_1(repository, hookRegistry) {
                var _this = _super.call(this) || this;
                _this.repository = repository;
                _this.hookRegistry = hookRegistry;
                return _this;
            }
            GenericServiceHost_1.prototype.getRepoWithScopePipe = function (req, repo) {
                if (!userScope)
                    return repo;
                var scope_field = 'user_id'; // Make sure this is a valid column name and doesn't come directly from user input
                var scope_id = req.user.userId;
                return repo.where("entity.".concat(scope_field, " = :scope_id"), {
                    scope_id: scope_id,
                });
            };
            GenericServiceHost_1.prototype.getRepoWithScope = function (req) {
                if (!userScope)
                    return this.repository.createQueryBuilder('entity');
                var scope_field = 'user_id'; // Make sure this is a valid column name and doesn't come directly from user input
                var scope_id = req.user.userId;
                return this.repository
                    .createQueryBuilder('entity')
                    .where("entity.".concat(scope_field, " = :scope_id"), { scope_id: scope_id });
            };
            GenericServiceHost_1.prototype.create = function (data, req) {
                return __awaiter(this, void 0, void 0, function () {
                    var newData, beforeHook, afterHook, savedData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                newData = __assign({ user_id: req.user.userId }, data);
                                beforeHook = this.hookRegistry.getHook("".concat(entity.name, ".before.create"));
                                afterHook = this.hookRegistry.getHook("".concat(entity.name, ".after.create"));
                                if (beforeHook) {
                                    newData = beforeHook(newData);
                                }
                                return [4 /*yield*/, this.repository.save(newData)];
                            case 1:
                                savedData = _a.sent();
                                if (afterHook) {
                                    afterHook(savedData);
                                }
                                return [2 /*return*/, result_1.Result.ok(savedData)];
                        }
                    });
                });
            };
            GenericServiceHost_1.prototype.delete = function (id, req) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this.getRepoWithScope(req).softDelete()];
                    });
                });
            };
            GenericServiceHost_1.prototype.findAll = function (req) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = result_1.Result).ok;
                                return [4 /*yield*/, this.getRepoWithScope(req).getMany()];
                            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                        }
                    });
                });
            };
            GenericServiceHost_1.prototype.findByFilter = function (query, country, req) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this._findByFilter(query, country, req)];
                    });
                });
            };
            GenericServiceHost_1.prototype._findByFilter = function (query, country, req) {
                return __awaiter(this, void 0, void 0, function () {
                    var relationFields, filterableColumns, allColumnNames, filterFields, repo, _i, relationFields_1, field, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                relationFields = this.repository.metadata.relations.map(function (relation) { return relation.propertyName; });
                                filterableColumns = relationFields.reduce(function (acc, field) {
                                    acc[field + '_id'] = [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.GT];
                                    return acc;
                                }, {});
                                allColumnNames = this.repository.metadata.columns.map(function (column) { return column.propertyName; });
                                filterFields = (0, fields_helper_1.getFilterFields)(entity).filter(function (field) {
                                    return allColumnNames.includes(field);
                                });
                                repo = this.repository.createQueryBuilder('entity');
                                for (_i = 0, relationFields_1 = relationFields; _i < relationFields_1.length; _i++) {
                                    field = relationFields_1[_i];
                                    repo = repo.leftJoinAndSelect("entity.".concat(field), field);
                                }
                                _b = (_a = result_1.Result).ok;
                                return [4 /*yield*/, (0, nestjs_paginate_1.paginate)(query, this.getRepoWithScopePipe(req, repo), {
                                        sortableColumns: filterFields,
                                        searchableColumns: filterFields,
                                        filterableColumns: filterableColumns,
                                        maxLimit: 0,
                                    })];
                            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                        }
                    });
                });
            };
            GenericServiceHost_1.prototype.findOne = function (id, req) {
                return __awaiter(this, void 0, void 0, function () {
                    var entity;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.getRepoWithScope(req)
                                    .where('id = ' + id)
                                    .getOne()];
                            case 1:
                                entity = _a.sent();
                                return [2 /*return*/, result_1.Result.ok(entity)];
                        }
                    });
                });
            };
            GenericServiceHost_1.prototype.update = function (id, data, req) {
                return __awaiter(this, void 0, void 0, function () {
                    var entity, entityNew;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.getRepoWithScope(req)
                                    .where('id = ' + id)
                                    .getOne()];
                            case 1:
                                entity = _a.sent();
                                Object.assign(entity, data);
                                return [4 /*yield*/, this.repository.save(entity)];
                            case 2:
                                entityNew = _a.sent();
                                return [2 /*return*/, result_1.Result.ok(entityNew)];
                        }
                    });
                });
            };
            return GenericServiceHost_1;
        }(_classSuper));
        __setFunctionName(_classThis, "GenericServiceHost");
        (function () {
            var _a;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            _findAll_decorators = [];
            _findByFilter_decorators = [];
            __findByFilter_decorators = [];
            _findOne_decorators = [];
            __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _findByFilter_decorators, { kind: "method", name: "findByFilter", static: false, private: false, access: { has: function (obj) { return "findByFilter" in obj; }, get: function (obj) { return obj.findByFilter; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, __findByFilter_decorators, { kind: "method", name: "_findByFilter", static: false, private: false, access: { has: function (obj) { return "_findByFilter" in obj; }, get: function (obj) { return obj._findByFilter; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GenericServiceHost = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return GenericServiceHost = _classThis;
    }();
    return GenericServiceHost;
}
exports.GenericBaseApiService = GenericBaseApiService;
