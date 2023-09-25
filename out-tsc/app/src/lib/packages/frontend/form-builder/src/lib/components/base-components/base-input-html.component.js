"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInputHtmlComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const base_input_component_1 = require("./base-input.component");
let BaseInputHtmlComponent = class BaseInputHtmlComponent extends base_input_component_1.BaseInputComponent {
    constructor() {
        super(...arguments);
        this.quillConfiguration = {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                ['link'],
                ['clean'],
            ],
        };
    }
    onEventChange(event) {
        if (event.value) {
            this.dataOutput.emit(event.value.toISOString());
        }
    }
};
exports.BaseInputHtmlComponent = BaseInputHtmlComponent;
exports.BaseInputHtmlComponent = BaseInputHtmlComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-html',
        template: '<ng-container ></ng-container>',
    })
], BaseInputHtmlComponent);
//# sourceMappingURL=base-input-html.component.js.map