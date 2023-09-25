"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInputFileComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const core_2 = require("@ngx-translate/core");
const base_input_component_1 = require("./base-input.component");
const src_1 = require("../../../../../angular-commons/src");
let BaseInputFileComponent = class BaseInputFileComponent extends base_input_component_1.BaseInputComponent {
    constructor(_httpClient, cdRef, translateService, environmentStorage) {
        super(cdRef, translateService);
        this._httpClient = _httpClient;
        this.cdRef = cdRef;
        this.translateService = translateService;
        this.environmentStorage = environmentStorage;
        this.editMode = false;
        this.edit = true;
        this.baseApiUrl = '';
        this.baseUrl = '';
        this.baseUrl = this.environmentStorage.baseUrl;
        this.baseApiUrl = this.baseUrl + '/files/';
    }
    init() {
        super.init();
        this.file_id = this.formController
            ?.getForm()
            .get(this.formField.name)?.value;
    }
    /**
     * Upload avatar
     *
     * @param fileList
     */
    async uploadAvatar(fileList) {
        if (!fileList.length) {
            return;
        }
        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];
        if (!allowedTypes.includes(file.type)) {
            return;
        }
        const formData = new FormData();
        formData.append('image', file, file.name);
        (0, rxjs_1.firstValueFrom)(this._httpClient.post(`${this.baseUrl}/files/upload`, formData)).then((response) => {
            this.toggleEditMode(false);
            const tempPatch = {};
            tempPatch[this.formField.name] = response.id;
            this.formController?.getForm().patchValue(tempPatch);
            this.file_id = response.id;
        });
    }
    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode = null) {
        if (editMode === null) {
            this.editMode = !this.editMode;
        }
        else {
            this.editMode = editMode;
        }
        // Mark for check
        this.cdRef.markForCheck();
    }
};
exports.BaseInputFileComponent = BaseInputFileComponent;
exports.BaseInputFileComponent = BaseInputFileComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-file',
        template: '<ng-container ></ng-container>',
    }),
    tslib_1.__metadata("design:paramtypes", [http_1.HttpClient,
        core_1.ChangeDetectorRef,
        core_2.TranslateService,
        src_1.EnvironmentStorageService])
], BaseInputFileComponent);
//# sourceMappingURL=base-input-file.component.js.map