"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormController = void 0;
const forms_1 = require("@angular/forms");
const src_1 = require("../../../../../shared/generics/src");
class FormController {
    constructor(model, facade = null, modelDefinition = null) {
        this.modelDefinition = null;
        this.beforeSaveFunction = null;
        if (facade) {
            this.store = facade.store;
            this.facade = facade;
        }
        this.model = model;
        if (modelDefinition) {
            this.modelDefinition = modelDefinition;
        }
        else {
            this.modelDefinition = model;
        }
        this.form = new forms_1.UntypedFormGroup({}, null, null);
    }
    getClassName() {
        return src_1.META.getNameByModel(this.getModelDefinition());
    }
    addFormControl(control, name) {
        this.form.addControl(name, control);
    }
    setModel(model) {
        this.model = model;
    }
    makeFormGroupReadOnly() {
        this.makeFormReadOnly(this.form);
    }
    makeFormReadOnly(formGroup) {
        Object.keys(formGroup.controls).forEach((key) => {
            const control = formGroup.controls[key];
            if (control instanceof forms_1.UntypedFormGroup) {
                this.makeFormReadOnly(control);
            }
            else {
                control.disable();
            }
        });
    }
    save(formValues = null) {
        if (this.form.valid) {
            this.facade.save(this.form.value);
        }
    }
    async create(scope = null) {
        if (this.form.valid) {
            try {
                await this.beforeSave();
                let entity = this.form.value;
                if (scope && scope.length > 0) {
                    entity[scope[0].key] = scope[0].value;
                }
                this.facade.base.add(entity);
            }
            catch (err) {
                // Handle error here.
            }
        }
    }
    applyScope(scope) { }
    getForm() {
        return this.form;
    }
    extendForm(form) {
        return form;
    }
    load() { }
    async beforeSave() {
        if (this.beforeSaveFunction) {
            this.form = await this.beforeSaveFunction(this.form);
        }
    }
    cleanForm() {
        this.form.markAsPristine();
    }
    getModel() {
        return this.model;
    }
    getStore() {
        return this.store;
    }
    getControl(fieldName) {
        return this.form.get(fieldName);
    }
    getValue(name) {
        if (this.model !== undefined &&
            this.model[name] !== undefined) {
            return this.model[name] !== undefined
                ? this.model[name]
                : null;
        }
    }
    patchValues(values) {
        this.form.patchValue(values);
    }
    getModelDefinition() {
        return this.modelDefinition;
    }
    getElementLabel(fieldName) {
        return (src_1.META.getNameByModel(this.getModelDefinition()) +
            '.properties.' +
            fieldName);
    }
    getDependency(fieldName) {
        if (!this.getModelDefinition() && !fieldName) {
            return null;
        }
        return Reflect.getMetadata('fb:dependency', this.getModelDefinition(), fieldName);
    }
    getVisibility(fieldName) {
        if (!this.getModelDefinition() && !fieldName) {
            return null;
        }
        return Reflect.getMetadata(src_1.VISIBILITY_PREFIX, this.getModelDefinition(), fieldName);
    }
    registerBeforeSaveFunction(fn) {
        this.beforeSaveFunction = fn;
    }
}
exports.FormController = FormController;
//# sourceMappingURL=form-controller.js.map