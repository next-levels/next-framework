import { Fields } from '@next-levels/types';

export class DefaultGenerator<T> {
  // Method to get all properties of the model for list fields
  getFields(model: T): Fields<T> {
    return Object.keys(model) as Fields<T>;
  }

  // Method to get default search fields (like name or id)
  getSearchFields(model: T): Fields<T> {
    return Object.keys(model).filter(
      (key) =>
        key.toLowerCase().includes('name') || key.toLowerCase().includes('id')
    ) as Fields<T>;
  }
}
