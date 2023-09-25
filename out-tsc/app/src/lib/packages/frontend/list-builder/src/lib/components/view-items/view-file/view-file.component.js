"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewFileComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const base_view_component_1 = require("../base-view/base-view.component");
const common_1 = require("@angular/common");
const environment_storage_service_1 = require("../../../../../../angular-commons/src/lib/environment-storage/environment-storage.service");
let ViewFileComponent = class ViewFileComponent extends base_view_component_1.BaseViewComponent {
    constructor(datePipe, cdRef, environmentStorage) {
        super(cdRef);
        this.datePipe = datePipe;
        this.cdRef = cdRef;
        this.environmentStorage = environmentStorage;
        this.baseUrl = '';
        this.baseUrl = this.environmentStorage.baseUrl;
    }
    ngOnInit() {
        super.ngOnInit();
        this._value = this.baseUrl + '/files/' + this._value;
    }
};
exports.ViewFileComponent = ViewFileComponent;
exports.ViewFileComponent = ViewFileComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'vosdellen-view-file',
        templateUrl: './view-file.component.html',
        styleUrls: ['./view-file.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [common_1.DatePipe,
        core_1.ChangeDetectorRef,
        environment_storage_service_1.EnvironmentStorageService])
], ViewFileComponent);
//# sourceMappingURL=view-file.component.js.map