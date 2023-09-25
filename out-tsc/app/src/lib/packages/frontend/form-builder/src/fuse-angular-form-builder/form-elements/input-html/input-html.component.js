"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputHtmlComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const public_api_1 = require("../../../../public_api");
let InputHtmlComponent = class InputHtmlComponent extends public_api_1.BaseInputHtmlComponent {
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
exports.InputHtmlComponent = InputHtmlComponent;
exports.InputHtmlComponent = InputHtmlComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-html',
        templateUrl: './input-html.component.html',
    })
], InputHtmlComponent);
//# sourceMappingURL=input-html.component.js.map