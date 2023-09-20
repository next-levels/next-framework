import { Injectable } from '@angular/core';
import { META } from 'src/lib/packages/shared/generics/src/lib/helpers/meta-data.helper';

@Injectable({ providedIn: 'root' })
export class InstanceRegistryService {
  private instanceMap: Map<string, any> = new Map();

  register(model: any, instance: any): void {
    const options = META.getOptionsByModel(new model());
    let key = '';
    if (options) {
      key = options.name;
    }
    this.instanceMap.set(key, instance);
  }

  retrieve(model: any): typeof model | undefined {
    let key = '';
    if (typeof model === 'string') {
      key = model;
    }
    if (typeof model === 'function') {
      const options = META.getOptionsByModel(new model());
      if (options) {
        key = options.name;
      }
    }
    return this.instanceMap.get(key) as typeof model;
  }
}
