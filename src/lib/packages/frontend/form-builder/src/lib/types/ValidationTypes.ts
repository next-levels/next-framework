import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ValidationType } from './ValidationType';

export class ValidationTypes {
  static PHONE_NUMBER: ValidationType = {
    validation: Validators.pattern('[- +()0-9]+'),
    error_code: 'pattern',
    error_message:
      'Bitte geben Sie nur Zahlen, sowie folgende Sonderzeichen an: “+” ; “/” ; “(“ ; “)”.',
  };

  static PURCHASE_DATE: ValidationType = {
    validation: checkPurchaseDate(),

    error_code: 'dateFutureOr15Days',

    error_message: 'Das Datum muss in der Vergangenheit liegen.',
  };

  static EMAIL: ValidationType = {
    validation: Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
    error_code: 'pattern',
    error_message: 'Bitte geben Sie eine gültige E-Mail Adresse an.',
  };

  static IBAN: ValidationType = {
    validation: Validators.pattern(
      // Quelle des Pattern: ChatGPT
      '^(?=.{2,32}$)[A-Z]{2}d{2}[A-Z0-9]{1,30}$|^Test$'
    ),
    error_code: 'pattern',
    error_message: 'Bitte geben Sie eine gültige IBAN an.',
  };

  static BIC: ValidationType = {
    validation: Validators.pattern(
      // Quelle des Pattern: https://www.regextester.com/98275
      '^([a-zA-Z]{4})([a-zA-Z]{2})(([2-9a-zA-Z]{1})([0-9a-np-zA-NP-Z]{1}))((([0-9a-wy-zA-WY-Z]{1})([0-9a-zA-Z]{2}))|([xX]{3}))$|^Test$'
    ),
    error_code: 'pattern',
    error_message: 'Bitte geben Sie eine gültige BIC an.',
  };

  static NAME: ValidationType = {
    validation: Validators.pattern("^[A-Z][-a-zA-Z. \\']{1,}$"),
    error_code: 'pattern',
    error_message: 'Dies scheint kein richtig geschriebener Name zu sein.',
  };

  static NAME_LCFIRST: ValidationType = {
    validation: Validators.pattern("^[-a-zA-Z. \\']{1,}$"),
    error_code: 'pattern',
    error_message: 'Dies scheint kein richtig geschriebener Name zu sein.',
  };

  static POSITIVE_INTEGER: ValidationType = {
    validation: Validators.pattern('^[1-9][0-9]*$'),
    error_code: 'pattern',
    error_message: 'Bitte tragen Sie eine positive Zahl in dieses Feld ein.',
  };

  static MONEY: ValidationType = {
    validation: Validators.pattern('^[0-9]+(,[0-9]{2})?$'),
    error_code: 'pattern',
    error_message:
      'Bitte tragen Sie einen monetären Betrag in dieses Feld ein.',
  };

  static URL_WHITESPACE: ValidationType = {
    validation: Validators.pattern('\\S*'),
    error_code: 'pattern',
    error_message: 'Eine Homepage Adresse kann kein Leerzeichen enthalten',
  };

  static DATE_PAST: ValidationType = {
    validation: checkDatePast(),
    error_code: 'dateFuture',
    error_message: 'Das Datum muss in der Vergangenheit liegen.',
  };

  static DATE_18_YEARS: ValidationType = {
    validation: checkDateEightTeenYears(),
    error_code: 'dateTooYoung',
    error_message: 'Volljährigkeit erforderlich.',
  };
}

function checkDatePast(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    return value >= new Date() ? { dateFuture: true } : null;
  };
}

function checkDateEightTeenYears(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return value >= date ? { dateTooYoung: true } : null;
  };
}

function checkPurchaseDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
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
