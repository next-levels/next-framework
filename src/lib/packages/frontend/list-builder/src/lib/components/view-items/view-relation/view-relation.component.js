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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewRelationComponent = void 0;
var core_1 = require("@angular/core");
var base_view_component_1 = require("../base-view/base-view.component");
var store_1 = require("@ngrx/store");
var ViewRelationComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'nxtlvls-view-relation',
            templateUrl: './view-relation.component.html',
            styleUrls: ['./view-relation.component.scss'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_view_component_1.BaseViewComponent;
    var ViewRelationComponent = _classThis = /** @class */ (function (_super) {
        __extends(ViewRelationComponent_1, _super);
        function ViewRelationComponent_1(cdRef, router, store) {
            var _this = _super.call(this, cdRef) || this;
            _this.cdRef = cdRef;
            _this.router = router;
            _this.store = store;
            _this.detail_fields = [];
            return _this;
        }
        ViewRelationComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            if (this.listField &&
                this.listField.type === 'RELATION' &&
                this.listField.options &&
                this.listField.options.selector) {
                if (this.listField.options.selector.includes('.')) {
                    var fieldNameArray = this.listField.options.selector.split('.');
                    if (this.viewObject[fieldNameArray[0]] && this.viewObject[fieldNameArray[0]][fieldNameArray[1]])
                        this._value = this.viewObject[fieldNameArray[0]][fieldNameArray[1]];
                }
            }
            if (this.listField &&
                this.listField.type === 'RELATION' &&
                this.listField.options &&
                this.listField.options.map) {
                var forign_id_1;
                if (this.listField.options.map.includes('.')) {
                    var fieldNameArray = this.listField.options.map.split('.');
                    forign_id_1 = this.viewObject[fieldNameArray[0]][fieldNameArray[1]];
                }
                var settings_1 = this.listController
                    .getModelDefinition()
                    .relations(this.fieldName);
                if (settings_1.action !== undefined && settings_1.selector !== undefined) {
                    this.store.dispatch(settings_1.action);
                    this.store.pipe((0, store_1.select)(settings_1.selector)).subscribe(function (data) {
                        if (!data || data.length === 0)
                            return;
                        _this._value = _this.mapData(settings_1.fields, data.find(function (item) { return item.id === forign_id_1; }));
                        _this.cdRef.detectChanges();
                    });
                }
            }
            if (this.listField &&
                this.detailView &&
                this.listField.type === 'RELATION' &&
                this.listField.options &&
                this.listField.options.detail_fields) {
                this.detail_fields = this.mapDataDetails(this.listField.options.detail_fields, this.viewObject);
            }
        };
        ViewRelationComponent_1.prototype.mapData = function (fields, data) {
            var fieldValues = [];
            fields.forEach(function (field) {
                var value = data;
                field.split('.').forEach(function (key) {
                    value = value ? value[key] : null;
                });
                if (value !== null)
                    fieldValues.push(value);
            });
            return fieldValues[0];
        };
        ViewRelationComponent_1.prototype.mapDataDetails = function (fields, data) {
            var fieldValues = [];
            fields.forEach(function (field) {
                var value = data;
                field.split('.').forEach(function (key) {
                    value = value ? value[key] : null;
                });
                if (value !== null)
                    fieldValues.push({ label: field.split('.')[0] + '.properties.' + field.split('.')[1], value: value });
            });
            return fieldValues;
        };
        ViewRelationComponent_1.prototype.openRelation = function () {
            var _a;
            return;
            if (this.listField &&
                this.listField.options &&
                this.listField.options.selector) {
                if (this.listField.options.selector.includes('.')) {
                    var fieldNameArray = this.listField.options.selector.split('.');
                    var url = fieldNameArray[0];
                    if (this.listField.options.model) {
                        url =
                            (_a = this.listController.getModelOptions(this.listField.options.model)
                                .url) !== null && _a !== void 0 ? _a : fieldNameArray[0];
                    }
                    this.router
                        .navigateByUrl('/' + url + '/' + this.viewObject[fieldNameArray[0]]['id'])
                        .then(function (r) { return r; });
                }
            }
        };
        return ViewRelationComponent_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ViewRelationComponent");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ViewRelationComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ViewRelationComponent = _classThis;
}();
exports.ViewRelationComponent = ViewRelationComponent;
