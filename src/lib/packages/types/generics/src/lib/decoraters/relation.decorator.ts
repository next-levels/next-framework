import 'reflect-metadata';
import { JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Field, RelationOptions } from '@next-levels/types';

const RELATION_METADATA_KEY = Symbol('RelationOptions');

export function Relation(options: RelationOptions) {
  return function (target: Object, propertyKey: string): void {
    const relationshipType = Reflect.getMetadata(
      'design:type',
      target,
      propertyKey
    );

    const model = options.model;

    // Dynamically select OneToOne or OneToMany based on 'type' option
    if (options.type === 'one') {
      OneToOne(model, propertyKey, {
        cascade: options.cascade,
        eager: options.eager,
      })(target, propertyKey);
      if (options.main) {
        JoinColumn({
          name: options.key,
          referencedColumnName: options.keySelf,
        })(target, propertyKey);
      }
    } else if (options.type === 'many') {
      if (options.main) {
        ManyToOne(model, options.inverse, {
          cascade: options.cascade,
          eager: options.eager,
        })(target, propertyKey);

        JoinColumn({
          name: options.key,
          referencedColumnName: options.keySelf,
        })(target, propertyKey);
      } else {
        OneToMany(model, options.inverse)(target, propertyKey);
      }
      // Typically, JoinColumn is not used with OneToMany
    }
    applyFieldDecorator(target, propertyKey, options);
    // Store custom metadata if needed
    Reflect.defineMetadata(RELATION_METADATA_KEY, options, target, propertyKey);
  };
}

function applyFieldDecorator(
  target: Object,
  propertyKey: string,
  options: RelationOptions
) {
  if (options.fields) {
    Field({
      type: 'RELATION',
      options: {
        model: options.model,
        fields: options.fields,
        selector: options.model + '.' + options.fields[0],
      },
    })(target, propertyKey);
  }
}
