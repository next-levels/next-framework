"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationTypes = void 0;
const forms_1 = require("@angular/forms");
class ValidationTypes {
    static { this.PHONE_NUMBER = {
        validation: forms_1.Validators.pattern('[- +()0-9]+'),
        error_code: 'pattern',
        error_message: 'Bitte geben Sie nur Zahlen, sowie folgende Sonderzeichen an: “+” ; “/” ; “(“ ; “)”.',
    }; }
    static { this.PURCHASE_DATE = {
        validation: checkPurchaseDate(),
        error_code: 'dateFutureOr15Days',
        error_message: 'Das Datum muss in der Vergangenheit liegen.',
    }; }
    static { this.EMAIL = {
        validation: forms_1.Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
        error_code: 'pattern',
        error_message: 'Bitte geben Sie eine gültige E-Mail Adresse an.',
    }; }
    static { this.IBAN = {
        validation: forms_1.Validators.pattern(
        // Quelle des Pattern: ChatGPT
        '^(?=.{2,32}$)[A-Z]{2}d{2}[A-Z0-9]{1,30}$|^Test$'),
        error_code: 'pattern',
        error_message: 'Bitte geben Sie eine gültige IBAN an.',
    }; }
    static { this.BIC = {
        validation: forms_1.Validators.pattern(
        // Quelle des Pattern: https://www.regextester.com/98275
        '^([a-zA-Z]{4})([a-zA-Z]{2})(([2-9a-zA-Z]{1})([0-9a-np-zA-NP-Z]{1}))((([0-9a-wy-zA-WY-Z]{1})([0-9a-zA-Z]{2}))|([xX]{3}))$|^Test$'),
        error_code: 'pattern',
        error_message: 'Bitte geben Sie eine gültige BIC an.',
    }; }
    static { this.NAME = {
        validation: forms_1.Validators.pattern("^[A-Z][-a-zA-Z. \\']{1,}$"),
        error_code: 'pattern',
        error_message: 'Dies scheint kein richtig geschriebener Name zu sein.',
    }; }
    static { this.NAME_LCFIRST = {
        validation: forms_1.Validators.pattern("^[-a-zA-Z. \\']{1,}$"),
        error_code: 'pattern',
        error_message: 'Dies scheint kein richtig geschriebener Name zu sein.',
    }; }
    static { this.POSITIVE_INTEGER = {
        validation: forms_1.Validators.pattern('^[1-9][0-9]*$'),
        error_code: 'pattern',
        error_message: 'Bitte tragen Sie eine positive Zahl in dieses Feld ein.',
    }; }
    static { this.MONEY = {
        validation: forms_1.Validators.pattern('^[0-9]+(,[0-9]{2})?$'),
        error_code: 'pattern',
        error_message: 'Bitte tragen Sie einen monetären Betrag in dieses Feld ein.',
    }; }
    static { this.URL_WHITESPACE = {
        validation: forms_1.Validators.pattern('\\S*'),
        error_code: 'pattern',
        error_message: 'Eine Homepage Adresse kann kein Leerzeichen enthalten',
    }; }
    static { this.DATE_PAST = {
        validation: checkDatePast(),
        error_code: 'dateFuture',
        error_message: 'Das Datum muss in der Vergangenheit liegen.',
    }; }
    static { this.DATE_18_YEARS = {
        validation: checkDateEightTeenYears(),
        error_code: 'dateTooYoung',
        error_message: 'Volljährigkeit erforderlich.',
    }; }
}
exports.ValidationTypes = ValidationTypes;
function checkDatePast() {
    return (control) => {
        const value = control.value;
        if (!value) {
            return null;
        }
        return value >= new Date() ? { dateFuture: true } : null;
    };
}
function checkDateEightTeenYears() {
    return (control) => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return value >= date ? { dateTooYoung: true } : null;
    };
}
function checkPurchaseDate() {
    return (control) => {
        const value = control.value;
        if (!value) {
            return null;
        }
        let error = null;
        let date = new Date();
        if (new Date(value) > date) {
            error = { dateFutureOr15Days: true };
        }
        return error;
    };
}
//# sourceMappingURL=ValidationTypes.js.map