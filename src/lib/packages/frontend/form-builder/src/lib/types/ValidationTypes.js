"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationTypes = void 0;
var forms_1 = require("@angular/forms");
var ValidationTypes = /** @class */ (function () {
    function ValidationTypes() {
    }
    ValidationTypes.PHONE_NUMBER = {
        validation: forms_1.Validators.pattern('[- +()0-9]+'),
        error_code: 'pattern',
        error_message: 'Bitte geben Sie nur Zahlen, sowie folgende Sonderzeichen an: “+” ; “/” ; “(“ ; “)”.',
    };
    ValidationTypes.PURCHASE_DATE = {
        validation: checkPurchaseDate(),
        error_code: 'dateFutureOr15Days',
        error_message: 'Das Datum muss in der Vergangenheit liegen.',
    };
    ValidationTypes.EMAIL = {
        validation: forms_1.Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
        error_code: 'pattern',
        error_message: 'Bitte geben Sie eine gültige E-Mail Adresse an.',
    };
    ValidationTypes.IBAN = {
        validation: forms_1.Validators.pattern(
        // Quelle des Pattern: ChatGPT
        '^(?=.{2,32}$)[A-Z]{2}d{2}[A-Z0-9]{1,30}$|^Test$'),
        error_code: 'pattern',
        error_message: 'Bitte geben Sie eine gültige IBAN an.',
    };
    ValidationTypes.BIC = {
        validation: forms_1.Validators.pattern(
        // Quelle des Pattern: https://www.regextester.com/98275
        '^([a-zA-Z]{4})([a-zA-Z]{2})(([2-9a-zA-Z]{1})([0-9a-np-zA-NP-Z]{1}))((([0-9a-wy-zA-WY-Z]{1})([0-9a-zA-Z]{2}))|([xX]{3}))$|^Test$'),
        error_code: 'pattern',
        error_message: 'Bitte geben Sie eine gültige BIC an.',
    };
    ValidationTypes.NAME = {
        validation: forms_1.Validators.pattern("^[A-Z][-a-zA-Z. \\']{1,}$"),
        error_code: 'pattern',
        error_message: 'Dies scheint kein richtig geschriebener Name zu sein.',
    };
    ValidationTypes.NAME_LCFIRST = {
        validation: forms_1.Validators.pattern("^[-a-zA-Z. \\']{1,}$"),
        error_code: 'pattern',
        error_message: 'Dies scheint kein richtig geschriebener Name zu sein.',
    };
    ValidationTypes.POSITIVE_INTEGER = {
        validation: forms_1.Validators.pattern('^[1-9][0-9]*$'),
        error_code: 'pattern',
        error_message: 'Bitte tragen Sie eine positive Zahl in dieses Feld ein.',
    };
    ValidationTypes.MONEY = {
        validation: forms_1.Validators.pattern('^[0-9]+(,[0-9]{2})?$'),
        error_code: 'pattern',
        error_message: 'Bitte tragen Sie einen monetären Betrag in dieses Feld ein.',
    };
    ValidationTypes.URL_WHITESPACE = {
        validation: forms_1.Validators.pattern('\\S*'),
        error_code: 'pattern',
        error_message: 'Eine Homepage Adresse kann kein Leerzeichen enthalten',
    };
    ValidationTypes.DATE_PAST = {
        validation: checkDatePast(),
        error_code: 'dateFuture',
        error_message: 'Das Datum muss in der Vergangenheit liegen.',
    };
    ValidationTypes.DATE_18_YEARS = {
        validation: checkDateEightTeenYears(),
        error_code: 'dateTooYoung',
        error_message: 'Volljährigkeit erforderlich.',
    };
    return ValidationTypes;
}());
exports.ValidationTypes = ValidationTypes;
function checkDatePast() {
    return function (control) {
        var value = control.value;
        if (!value) {
            return null;
        }
        return value >= new Date() ? { dateFuture: true } : null;
    };
}
function checkDateEightTeenYears() {
    return function (control) {
        var value = control.value;
        if (!value) {
            return null;
        }
        var date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return value >= date ? { dateTooYoung: true } : null;
    };
}
function checkPurchaseDate() {
    return function (control) {
        var value = control.value;
        if (!value) {
            return null;
        }
        var error = null;
        var date = new Date();
        if (new Date(value) > date) {
            error = { dateFutureOr15Days: true };
        }
        return error;
    };
}
