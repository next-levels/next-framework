"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimizeService = exports.ComponentInstanceTypes = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const create_wizard_component_1 = require("../../components/create-wizard/create-wizard.component");
const dialog_1 = require("@angular/material/dialog");
const src_1 = require("../../../../../../shared/generics/src");
const src_2 = require("../../../../../form-builder/src");
var ComponentInstanceTypes;
(function (ComponentInstanceTypes) {
    ComponentInstanceTypes["AgencyModel"] = "Agentur";
    ComponentInstanceTypes["CustomerModel"] = "Kunde";
    ComponentInstanceTypes["ContractModel"] = "Vertrag";
    ComponentInstanceTypes["InsurerModel"] = "Versicherer";
})(ComponentInstanceTypes || (exports.ComponentInstanceTypes = ComponentInstanceTypes = {}));
let MinimizeService = class MinimizeService {
    constructor(_matDialog, store) {
        this._matDialog = _matDialog;
        this.store = store;
    }
    getLocalStorageKey() {
        return 'minimized_modals_';
    }
    getAll() {
        return (0, rxjs_1.of)(JSON.parse(localStorage.getItem(this.getLocalStorageKey()) ?? '[]'));
    }
    findByFilter() {
        return (0, rxjs_1.of)(JSON.parse(localStorage.getItem(this.getLocalStorageKey()) ?? '[]'));
    }
    getEntity() {
        return (0, rxjs_1.of)({});
    }
    addEntity(componentInstance) {
        componentInstance.type = this.getComponentInstanceType(componentInstance.model.constructor.name);
        const modal = this.setMinimizerOptions(componentInstance);
        const minimizedModals = this.getMinimizedModals();
        minimizedModals.push(modal);
        // localStorage.setItem(
        //   this.getLocalStorageKey(),
        //   JSON.stringify(minimizedModals, this.getCircularReplacer())
        // );
        return (0, rxjs_1.of)(modal);
    }
    updateEntity() {
        return (0, rxjs_1.of)({});
    }
    deleteEntity(modal) {
        const minimizedModals = this.getMinimizedModals();
        const index = minimizedModals.findIndex((minimizedModal) => minimizedModal.last_changes === modal.last_changes);
        minimizedModals.splice(index, 1);
        localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(minimizedModals));
        return (0, rxjs_1.of)({});
    }
    getComponentInstanceType(modelName) {
        switch (modelName) {
            case 'AgencyModel':
                return ComponentInstanceTypes.AgencyModel;
                break;
            case 'CustomerModel':
                return ComponentInstanceTypes.CustomerModel;
                break;
            case 'ContractModel':
                return ComponentInstanceTypes.ContractModel;
                break;
            case 'InsurerModel':
                return ComponentInstanceTypes.InsurerModel;
                break;
            default:
                return undefined;
                break;
        }
    }
    setMinimizerOptions(componentInstance) {
        const { modelDefinition, store, ...restOfFormController } = componentInstance.formController;
        return {
            type: componentInstance.type,
            last_changes: new Date().getTime().toString(),
            steps: componentInstance.steps,
            model: componentInstance.model,
            formValues: componentInstance.formController.form.value,
        };
    }
    removeCircularReferences(minimizedModal) {
        const seen = new WeakSet();
        return JSON.stringify(minimizedModal, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        });
    }
    minimizeCurrentModal(componentInstance) {
        /*  componentInstance.type = this.getComponentInstanceType(
            componentInstance.model.constructor.name
          );
      */
        componentInstance.type = src_1.META.getNameByModel(componentInstance.model);
        const modal = this.setMinimizerOptions(componentInstance);
        const minimizedModals = this.getMinimizedModals();
        minimizedModals.push(modal);
        localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(minimizedModals));
    }
    isCyclic(obj) {
        let seenObjects = [];
        function detect(obj) {
            if (obj && typeof obj === 'object') {
                if (seenObjects.indexOf(obj) !== -1) {
                    return true;
                }
                seenObjects.push(obj);
                for (var key in obj) {
                    if (obj.hasOwnProperty(key) && detect(obj[key])) {
                        console.log(obj, 'is cyclic at key', key);
                        return true;
                    }
                }
            }
            return false;
        }
        return detect(obj);
    }
    getMinimizedModals() {
        const test = JSON.parse(localStorage.getItem(this.getLocalStorageKey()) ?? '[]');
        return JSON.parse(localStorage.getItem(this.getLocalStorageKey()) ?? '[]');
    }
    openMinimizedModal(modalString) {
        const modal = modalString;
        this._matDialog
            .open(create_wizard_component_1.CreateWizardComponent, {
            autoFocus: false,
            minWidth: '50%',
            data: {
                model: src_1.META.getModelByName(modal.type),
                formController: new src_2.FormController(modal.formValues, this.store, src_1.META.getModelByName(modal.type)),
            },
        })
            .afterClosed()
            .subscribe(() => { });
    }
    deleteMinimizedModal(modal) {
        const minimizedModals = this.getMinimizedModals();
        const index = minimizedModals.findIndex((minimizedModal) => minimizedModal.last_changes === modal.last_changes);
        minimizedModals.splice(index, 1);
        // localStorage.setItem(
        //   this.getLocalStorageKey(),
        //   JSON.stringify(minimizedModals, this.removeCircularReferences())
        // );
    }
};
exports.MinimizeService = MinimizeService;
exports.MinimizeService = MinimizeService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [dialog_1.MatDialog, store_1.Store])
], MinimizeService);
//# sourceMappingURL=minimize.service.js.map