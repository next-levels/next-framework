"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewElementComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const core_2 = require("@ngx-translate/core");
const ListController_1 = require("../../../controllers/ListController");
const src_1 = require("../../../../../../../shared/generics/src");
let ViewElementComponent = class ViewElementComponent {
    constructor(translateService, cdRef, listBuilderComponents) {
        this.translateService = translateService;
        this.cdRef = cdRef;
        this.listBuilderComponents = listBuilderComponents;
        this.detailView = false;
    }
    ngOnInit() {
        this.translateService.get('test').subscribe((translated) => {
            const labelCode = src_1.META.getNameByModel(this.listController.getModelDefinition()) +
                '.properties.' +
                this.fieldName;
            this.listField = {
                label: this.translateService.instant(labelCode),
            };
        });
    }
    ngAfterViewInit() {
        if (this.fieldName) {
            if (this.viewObject) {
                let type = null;
                this.listField = this.getBuildField(this.fieldName);
                this.listField = {
                    ...this.listField,
                    ...this.getSettingsField(this.fieldName),
                };
                const labelCode = src_1.META.getNameByModel(this.listController.getModelDefinition()) +
                    '.properties.' +
                    this.fieldName;
                this.listField.label = this.translateService.instant(labelCode);
                if (this.listBuilderComponents) {
                    const component = this.listBuilderComponents[this.listField.type];
                    if (component) {
                        const componentRef = this.view.createComponent(component);
                        this.initComponent(componentRef);
                    }
                    else {
                        console.info(`No component found for type: ${this.listField.type}`);
                    }
                }
            }
        }
    }
    getSettingsField(field) {
        return Reflect.getMetadata(src_1.LISTFIELD_PREFIX, this.listController.getModelDefinition(), field);
    }
    getBuildField(field) {
        return Reflect.getMetadata(src_1.BUILDERFIELD_PREFIX, this.listController.getModelDefinition(), field);
    }
    initComponent(componentRef) {
        componentRef.instance.fieldName = this.fieldName;
        componentRef.instance.listField = this.listField;
        componentRef.instance.listController = this.listController;
        componentRef.instance.viewObject = this.viewObject;
        componentRef.instance.detailView = this.detailView;
        this.cdRef.detectChanges();
    }
};
exports.ViewElementComponent = ViewElementComponent;
tslib_1.__decorate([
    (0, core_1.ViewChild)('view', { read: core_1.ViewContainerRef }),
    tslib_1.__metadata("design:type", Object)
], ViewElementComponent.prototype, "view", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", String)
], ViewElementComponent.prototype, "fieldName", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], ViewElementComponent.prototype, "viewModel", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], ViewElementComponent.prototype, "viewObject", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], ViewElementComponent.prototype, "detailView", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", ListController_1.ListController)
], ViewElementComponent.prototype, "listController", void 0);
exports.ViewElementComponent = ViewElementComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxtlvls-view-element',
        templateUrl: './view-element.component.html',
        styleUrls: ['./view-element.component.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    tslib_1.__param(2, (0, core_1.Inject)('listBuilderComponents')),
    tslib_1.__metadata("design:paramtypes", [core_2.TranslateService,
        core_1.ChangeDetectorRef, Object])
], ViewElementComponent);
//# sourceMappingURL=view-element.component.js.map