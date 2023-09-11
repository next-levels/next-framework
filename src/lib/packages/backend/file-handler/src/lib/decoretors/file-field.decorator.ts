import 'reflect-metadata';
export const FILE_FIELD_METADATA_KEY = 'file_field_metadata';

export function FileField(options?: { multi?: boolean }): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const fileFields =
      Reflect.getMetadata(FILE_FIELD_METADATA_KEY, target) || [];
    const fieldData = {
      fieldName: propertyKey,
      multi: options?.multi || false,
    };
    fileFields.push(fieldData);
    Reflect.defineMetadata(FILE_FIELD_METADATA_KEY, fileFields, target);
  };
}
