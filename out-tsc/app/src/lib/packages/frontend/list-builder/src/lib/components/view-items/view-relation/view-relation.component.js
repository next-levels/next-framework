"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewRelationComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const base_view_component_1 = require("../base-view/base-view.component");
const router_1 = require("@angular/router");
const store_1 = require("@ngrx/store");
let ViewRelationComponent = class ViewRelationComponent extends base_view_component_1.BaseViewComponent {
    constructor(cdRef, router, store) {
        super(cdRef);
        this.cdRef = cdRef;
        this.router = router;
        this.store = store;
        this.detail_fields = [];
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.listField &&
            this.listField.type === 'RELATION' &&
            this.listField.options &&
            this.listField.options.selector) {
            if (this.listField.options.selector.includes('.')) {
                const fieldNameArray = this.listField.options.selector.split('.');
                if (this.viewObject[fieldNameArray[0]] &&
                    this.viewObject[fieldNameArray[0]][fieldNameArray[1]])
                    this._value = this.viewObject[fieldNameArray[0]][fieldNameArray[1]];
            }
        }
        if (this.listField &&
            this.listField.type === 'RELATION' &&
            this.listField.options &&
            this.listField.options.map) {
            let forign_id;
            if (this.listField.options.map.includes('.')) {
                const fieldNameArray = this.listField.options.map.split('.');
                forign_id = this.viewObject[fieldNameArray[0]][fieldNameArray[1]];
            }
            let settings = this.listController
                .getModelDefinition()
                .relations(this.fieldName);
            if (settings.action !== undefined && settings.selector !== undefined) {
                this.store.dispatch(settings.action);
                this.store.pipe((0, store_1.select)(settings.selector)).subscribe((data) => {
                    if (!data || data.length === 0)
                        return;
                    this._value = this.mapData(settings.fields, data.find((item) => item.id === forign_id));
                    this.cdRef.detectChanges();
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
    }
    mapData(fields, data) {
        const fieldValues = [];
        fields.forEach((field) => {
            let value = data;
            field.split('.').forEach((key) => {
                value = value ? value[key] : null;
            });
            if (value !== null)
                fieldValues.push(value);
        });
        return fieldValues[0];
    }
    mapDataDetails(fields, data) {
        const fieldValues = [];
        fields.forEach((field) => {
            let value = data;
            field.split('.').forEach((key) => {
                value = value ? value[key] : null;
            });
            if (value !== null)
                fieldValues.push({
                    label: field.split('.')[0] + '.properties.' + field.split('.')[1],
                    value: value,
                });
        });
        return fieldValues;
    }
    openRelation() {
        return;
        if (this.listField &&
            this.listField.options &&
            this.listField.options.selector) {
            if (this.listField.options.selector.includes('.')) {
                const fieldNameArray = this.listField.options.selector.split('.');
                let url = fieldNameArray[0];
                if (this.listField.options.model) {
                    url =
                        this.listController.getModelOptions(this.listField.options.model)
                            .url ?? fieldNameArray[0];
                }
                this.router
                    .navigateByUrl('/' + url + '/' + this.viewObject[fieldNameArray[0]]['id'])
                    .then((r) => r);
            }
        }
    }
};
exports.ViewRelationComponent = ViewRelationComponent;
exports.ViewRelationComponent = ViewRelationComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxtlvls-view-relation',
        templateUrl: './view-relation.component.html',
        styleUrls: ['./view-relation.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [core_1.ChangeDetectorRef,
        router_1.Router,
        store_1.Store])
], ViewRelationComponent);
//# sourceMappingURL=view-relation.component.js.map