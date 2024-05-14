import { Column } from 'typeorm';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';

export class MetaTypeormHelper {
  /*
   * @param schema
   * @param target
   * @param propertyKey
   */
  static mapZodSchemaToTypeormSchema(
    schema: any,
    target: any,
    propertyKey: string
  ): any {
    const metadata = schema._def;
    let columnOptions: ColumnOptions = {};

    switch (metadata.typeName) {
      case 'ZodString':
        columnOptions = { type: 'varchar', length: 255 };
        if (metadata.checks.some((check) => check.kind === 'min')) {
          columnOptions.length = Math.max(
            ...metadata.checks
              .filter((check) => check.kind === 'min')
              .map((check) => check.value)
          );
        }
        break;
      case 'ZodNumber':
        columnOptions = { type: 'int', unsigned: true };
        break;
      case 'ZodDate':
        columnOptions = { type: 'timestamp' };
        break;
    }

    Reflect.defineMetadata('design:type', Column, target, propertyKey);
    Reflect.defineMetadata(
      'design:typeorm:options',
      columnOptions,
      target,
      propertyKey
    );
  }
}
