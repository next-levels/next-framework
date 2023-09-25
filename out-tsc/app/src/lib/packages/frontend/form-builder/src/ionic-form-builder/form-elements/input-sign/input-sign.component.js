"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSignComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const core_2 = require("@ngx-translate/core");
const signature_pad_1 = require("signature_pad");
const angular_1 = require("@ionic/angular");
const ngx_1 = require("@awesome-cordova-plugins/camera/ngx");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const public_api_1 = require("../../../../public_api");
let InputSignComponent = class InputSignComponent extends public_api_1.BaseInputTextComponent {
    constructor(cdRef, translateService, elementRef, baseUrl, platform, camera, actionSheetController, http) {
        super(cdRef, translateService);
        this.cdRef = cdRef;
        this.translateService = translateService;
        this.elementRef = elementRef;
        this.baseUrl = baseUrl;
        this.platform = platform;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.http = http;
    }
    init() {
        this.formController.registerBeforeSaveFunction(this.beforeSave.bind(this));
    }
    ngAfterViewInit() {
        let canvas = document.getElementById('canvas');
        window.onresize = this.resizeCanvas.bind(this.signaturePadElement.nativeElement);
        this.resizeCanvas(canvas);
        this.signaturePad = new signature_pad_1.default(this.signaturePadElement.nativeElement);
        this.signaturePad.clear();
        this.signaturePad.penColor = 'rgb(255,255,255)';
        this.cdRef.detectChanges();
    }
    beforeSave(form) {
        return (0, rxjs_1.firstValueFrom)(this.http.post(this.baseUrl + '/files/upload/public/base64', {
            base64: this.signaturePad
                .toDataURL()
                .replace('data:image/png;base64,', ''),
        })).then((file) => {
            form.patchValue({ [this.formField.name]: file.id });
            this.cdRef.detectChanges();
            return form;
        }, (err) => {
            throw err; // This error will be caught by your `async`/`await` code in `create()`.
        });
    }
    resizeCanvas(canvas) {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        if (!canvas) {
            return;
        }
        let ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
    }
    saveSignature() {
        return this.signaturePad.toDataURL();
    }
    save() {
        const img = this.signaturePad.toDataURL();
    }
    isCanvasBlank() {
        if (this.signaturePad) {
            return this.signaturePad.isEmpty() ? true : false;
        }
    }
    clear() {
        this.signaturePad.clear();
    }
    undo() {
        const data = this.signaturePad.toData();
        if (data) {
            data.pop(); // remove the last dot or line
            this.signaturePad.fromData(data);
        }
    }
};
exports.InputSignComponent = InputSignComponent;
tslib_1.__decorate([
    (0, core_1.ViewChild)('canvas', { static: true }),
    tslib_1.__metadata("design:type", Object)
], InputSignComponent.prototype, "signaturePadElement", void 0);
exports.InputSignComponent = InputSignComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-sign',
        templateUrl: './input-sign.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    tslib_1.__param(3, (0, core_1.Inject)('baseUrl')),
    tslib_1.__metadata("design:paramtypes", [core_1.ChangeDetectorRef,
        core_2.TranslateService,
        core_1.ElementRef, String, angular_1.Platform,
        ngx_1.Camera,
        angular_1.ActionSheetController,
        http_1.HttpClient])
], InputSignComponent);
//# sourceMappingURL=input-sign.component.js.map