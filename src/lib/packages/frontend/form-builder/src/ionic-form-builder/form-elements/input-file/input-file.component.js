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
exports.InputFileComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var public_api_1 = require("../../../../public_api");
var InputFileComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'nxt-input-file',
            templateUrl: './input-file.component.html',
            styleUrls: ['./input-file.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = public_api_1.BaseInputFileComponent;
    var _instanceExtraInitializers = [];
    var _filePicker_decorators;
    var _filePicker_initializers = [];
    var InputFileComponent = _classThis = /** @class */ (function (_super) {
        __extends(InputFileComponent_1, _super);
        function InputFileComponent_1(_httpClient, cdRef, translateService, platform, camera, actionSheetController, http, environmentStorage) {
            var _this = _super.call(this, _httpClient, cdRef, translateService, environmentStorage) || this;
            _this._httpClient = (__runInitializers(_this, _instanceExtraInitializers), _httpClient);
            _this.cdRef = cdRef;
            _this.translateService = translateService;
            _this.platform = platform;
            _this.camera = camera;
            _this.actionSheetController = actionSheetController;
            _this.http = http;
            _this.environmentStorage = environmentStorage;
            _this.uploading = false;
            _this.bill = null;
            _this.file_is_pdf = false;
            _this.file = null;
            _this.filePicker = __runInitializers(_this, _filePicker_initializers, void 0);
            _this.api = {};
            return _this;
        }
        InputFileComponent_1.prototype.isNative = function () {
            return this.platform.is('cordova');
        };
        InputFileComponent_1.prototype.takeImage = function (ev) {
            return __awaiter(this, void 0, void 0, function () {
                var actionSheet;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.bill !== null) {
                                this.bill = null;
                                return [2 /*return*/];
                            }
                            if (!this.isNative()) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.actionSheetController.create({
                                    header: 'Bitte wählen',
                                    buttons: [
                                        {
                                            text: 'Aus Galerie wählen',
                                            handler: function () {
                                                _this.getPhotoNative(_this.camera.PictureSourceType.PHOTOLIBRARY);
                                            },
                                        },
                                        {
                                            text: 'Foto aufnehmen',
                                            handler: function () {
                                                _this.getPhotoNative(_this.camera.PictureSourceType.CAMERA);
                                            },
                                        },
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                        },
                                    ],
                                })];
                        case 1:
                            actionSheet = _a.sent();
                            return [4 /*yield*/, actionSheet.present()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            this.filePicker.nativeElement.click();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        InputFileComponent_1.prototype.onFileSelect = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var file, reader;
                var _this = this;
                return __generator(this, function (_a) {
                    if (this.isNative()) {
                        // await FilePicker.showFilePicker({ # TODO
                        //   fileTypes: ['pdf', 'image'],
                        // });
                    }
                    if (event.target.files.length > 0) {
                        this.uploading = true;
                        file = event.target.files[0];
                        reader = new FileReader();
                        reader.onload = function (fileData) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/];
                        }); }); };
                        reader.readAsDataURL(file);
                        this.uploading = false;
                    }
                    return [2 /*return*/];
                });
            });
        };
        InputFileComponent_1.prototype.getPhotoWeb = function (event) {
            var _this = this;
            if (event.target.files.length > 0) {
                this.uploading = true;
                var file = event.target.files[0];
                var formData = new FormData();
                formData.append('file', file, file.name);
                (0, rxjs_1.firstValueFrom)(this.http.post(this.baseUrl + '/files/upload/public', formData)).then(function (file) {
                    var _a;
                    var tempPatch = {};
                    tempPatch[_this.formField.name] = file.id;
                    (_a = _this.formController) === null || _a === void 0 ? void 0 : _a.getForm().patchValue(tempPatch);
                    if (file.type === 'application/pdf') {
                        _this.file_is_pdf = true;
                    }
                    _this.file = file;
                    _this.bill = _this.baseUrl + '/files/' + file.id;
                    _this.uploading = false;
                    _this.cdRef.detectChanges();
                });
            }
        };
        InputFileComponent_1.prototype.getPhotoNative = function (sourceType) {
            var _this = this;
            this.uploading = true;
            var options = {
                quality: 40,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: sourceType,
            };
            this.camera.getPicture(options).then(function (imageData) {
                (0, rxjs_1.firstValueFrom)(_this.http.post(_this.baseUrl + '/files/upload/public/base64', {
                    base64: imageData,
                })).then(function (file) {
                    var _a;
                    var tempPatch = {};
                    tempPatch[_this.formField.name] = file.id;
                    (_a = _this.formController) === null || _a === void 0 ? void 0 : _a.getForm().patchValue(tempPatch);
                    if (file.type === 'application/pdf') {
                        _this.file_is_pdf = true;
                    }
                    _this.file = file;
                    _this.bill = _this.baseUrl + '/files/' + file.id;
                    _this.uploading = false;
                    _this.cdRef.detectChanges();
                }, function (err) {
                    console.log(err);
                });
            }, function (err) {
                console.log(err);
            });
        };
        return InputFileComponent_1;
    }(_classSuper));
    __setFunctionName(_classThis, "InputFileComponent");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _filePicker_decorators = [(0, core_1.ViewChild)('filePicker', { static: false })];
        __esDecorate(null, null, _filePicker_decorators, { kind: "field", name: "filePicker", static: false, private: false, access: { has: function (obj) { return "filePicker" in obj; }, get: function (obj) { return obj.filePicker; }, set: function (obj, value) { obj.filePicker = value; } }, metadata: _metadata }, _filePicker_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InputFileComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InputFileComponent = _classThis;
}();
exports.InputFileComponent = InputFileComponent;
