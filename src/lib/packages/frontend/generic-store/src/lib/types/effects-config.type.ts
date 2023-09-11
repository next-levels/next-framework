import { InjectionToken } from '@angular/core';

export interface EffectsConfig {
  name: string;
  label?: string;
  route: string;
  actions: any;
  serviceToken: InjectionToken<any>;
}
