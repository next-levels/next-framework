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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSignComponent = void 0;
var core_1 = require("@angular/core");
var signature_pad_1 = require("signature_pad");
var rxjs_1 = require("rxjs");
var public_api_1 = require("../../../../public_api");
var InputSignComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'nxt-input-sign',
            templateUrl: './input-sign.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = public_api_1.BaseInputTextComponent;
    var _instanceExtraInitializers = [];
    var _signaturePadElement_decorators;
    var _signaturePadElement_initializers = [];
    var InputSignComponent = _classThis = /** @class */ (function (_super) {
        __extends(InputSignComponent_1, _super);
        function InputSignComponent_1(cdRef, translateService, elementRef, baseUrl, platform, camera, actionSheetController, http) {
            var _this = _super.call(this, cdRef, translateService) || this;
            _this.cdRef = (__runInitializers(_this, _instanceExtraInitializers), cdRef);
            _this.translateService = translateService;
            _this.elementRef = elementRef;
            _this.baseUrl = baseUrl;
            _this.platform = platform;
            _this.camera = camera;
            _this.actionSheetController = actionSheetController;
            _this.http = http;
            _this.signaturePadElement = __runInitializers(_this, _signaturePadElement_initializers, void 0);
            return _this;
        }
        InputSignComponent_1.prototype.init = function () {
            this.formController.registerBeforeSaveFunction(this.beforeSave.bind(this));
        };
        InputSignComponent_1.prototype.ngAfterViewInit = function () {
            var canvas = document.getElementById('canvas');
            window.onresize = this.resizeCanvas.bind(this.signaturePadElement.nativeElement);
            this.resizeCanvas(canvas);
            this.signaturePad = new signature_pad_1.default(this.signaturePadElement.nativeElement);
            this.signaturePad.clear();
            this.signaturePad.penColor = 'rgb(255,255,255)';
            this.cdRef.detectChanges();
        };
        InputSignComponent_1.prototype.beforeSave = function (form) {
            var _this = this;
            return (0, rxjs_1.firstValueFrom)(this.http.post(this.baseUrl + '/files/upload/public/base64', {
                base64: this.signaturePad
                    .toDataURL()
                    .replace('data:image/png;base64,', ''),
            })).then(function (file) {
                var _a;
                form.patchValue((_a = {}, _a[_this.formField.name] = file.id, _a));
                _this.cdRef.detectChanges();
                return form;
            }, function (err) {
                throw err; // This error will be caught by your `async`/`await` code in `create()`.
            });
        };
        InputSignComponent_1.prototype.resizeCanvas = function (canvas) {
            // When zoomed out to less than 100%, for some very strange reason,
            // some browsers report devicePixelRatio as less than 1
            // and only part of the canvas is cleared then.
            if (!canvas) {
                return;
            }
            var ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext('2d').scale(ratio, ratio);
        };
        InputSignComponent_1.prototype.saveSignature = function () {
            return this.signaturePad.toDataURL();
        };
        InputSignComponent_1.prototype.save = function () {
            var img = this.signaturePad.toDataURL();
        };
        InputSignComponent_1.prototype.isCanvasBlank = function () {
            if (this.signaturePad) {
                return this.signaturePad.isEmpty() ? true : false;
            }
        };
        InputSignComponent_1.prototype.clear = function () {
            this.signaturePad.clear();
        };
        InputSignComponent_1.prototype.undo = function () {
            var data = this.signaturePad.toData();
            if (data) {
                data.pop(); // remove the last dot or line
                this.signaturePad.fromData(data);
            }
        };
        return InputSignComponent_1;
    }(_classSuper));
    __setFunctionName(_classThis, "InputSignComponent");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _signaturePadElement_decorators = [(0, core_1.ViewChild)('canvas', { static: true })];
        __esDecorate(null, null, _signaturePadElement_decorators, { kind: "field", name: "signaturePadElement", static: false, private: false, access: { has: function (obj) { return "signaturePadElement" in obj; }, get: function (obj) { return obj.signaturePadElement; }, set: function (obj, value) { obj.signaturePadElement = value; } }, metadata: _metadata }, _signaturePadElement_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InputSignComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InputSignComponent = _classThis;
}();
exports.InputSignComponent = InputSignComponent;
