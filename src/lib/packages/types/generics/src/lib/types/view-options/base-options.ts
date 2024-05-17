// Style options type definition
import { BuilderOptions, HeroIcon } from '@next-levels/types';

export interface StyleOptions {
  type: 'small' | 'half' | 'full';
}

// Base interface for all elements with universal methods
export interface FormControl {
  hidden(): FormControl;

  translatable(): FormControl;

  readonly(): FormControl;

  hint(hint: string): FormControl;

  suffix(suffix: string): FormControl;

  icon(icon: HeroIcon): FormControl;

  style(styleOptions: StyleOptions): FormControl;

  view(): FormControl;

  getSettings(): BuilderOptions; // Method to retrieve settings after configurations
}

// Define a class or object that contains the creation functions for each element type
const o = {
  html() {
    return createElement('HTML', { size: 'full' });
  },
  checkbox() {
    return createElement('CHECKBOX');
  },
  currency() {
    return createElement('CURRENCY');
  },
  area() {
    return createElement('TEXTAREA');
  },
  dropdown() {
    return createElement('DROPDOWN');
  },
  file(allowedTypes: string[] = []) {
    return createElement('FILE', { allowedTypes: allowedTypes });
  },
  date() {
    return createElement('DATE');
  },
  radio() {
    return createElement('RADIO');
  },
  result() {
    return createElement('RESULT');
  },
  state() {
    return createElement('STATE');
  },
  image() {
    return createElement('IMAGEFILE');
  },
  code() {
    return createElement('CODE');
  },
  number() {
    return createElement('NUMBER');
  },
};

// Universal creation function used by all element factories
function createElement(
  type: BuilderOptions['type'],
  options?: any
): FormControl {
  let settings: BuilderOptions = { type, options };

  return {
    hidden() {
      settings.hidden = true;
      return this;
    },
    translatable() {
      settings.translatable = true;
      return this;
    },
    readonly() {
      settings.readonly = true;
      return this;
    },
    style(styleOptions: StyleOptions) {
      if (!settings.options) {
        settings.options = {};
      }
      settings.options.size = styleOptions.type;
      return this;
    },
    hint(hint: string) {
      settings.hint = hint;
      return this;
    },
    suffix(suffix: string) {
      settings.suffix = suffix;
      return this;
    },
    icon(icon: HeroIcon) {
      settings.icon = icon;
      return this;
    },
    view() {
      return this;
    },
    getSettings() {
      return settings;
    },
  };
}

export { o };
