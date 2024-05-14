import {ZodEnum, ZodNativeEnum} from 'zod';

/**
 * Registers an enum type in a TypeORM entity based on the information derived from a Zod schema.
 *
 * @export
 * @template T The type of the Zod object.
 * @param {keyof Infer<T>} key The property key in the entity.
 * @param {ZodEnum<any> | ZodNativeEnum<any>} enumZodType The Zod enum type.
 * @param {string} entityName The name of the entity where the enum is used.
 * @returns {Function} A decorator function for the entity property.

 export function registerEnumForTypeOrm<T extends AnyZodObject>(
 key: keyof Infer<T>,
 enumZodType: ZodEnum<any> | ZodNativeEnum<any>,
 entityName: string,
 propertyKey: string
 ): PropertyDecorator {
 const Enum = isZodInstance(ZodNativeEnum, enumZodType)
 ? enumZodType.enum
 : enumZodType.enum;

 if (
 !Object.values(Enum).every(
 (val) => typeof val === 'number' || typeof val === 'string'
 )
 ) {
 throw new Error(
 `Invalid enum values provided in ${entityName}.${String(key)} Enum`
 );
 }

 // This is a TypeScript decorator for defining an enum column in a TypeORM entity
 return function (target: any, propertyKey: string) {
 Column({
 type: 'enum',
 enum: Enum,
 enumName: `${entityName}_${String(key)}Enum`,
 nullable: enumZodType.isNullable(),
 default: enumZodType._def.defaultValue?.(),
 })(target, propertyKey);
 };
 }
 */

/**
 * Example usage within an entity class definition
 * Assuming the use of a Zod enum and a corresponding TypeORM entity.

 @Entity()
  class MyEntity {
 @registerEnumForTypeOrm('status', myZodEnumSchema, 'MyEntity')
  status: any; // The type here would be the specific enum type
  }
 */
