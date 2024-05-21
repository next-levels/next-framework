import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, ObjectType, Repository } from 'typeorm';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { IBaseCmsService } from './service.type';
import {
  getFilterFields,
  getRelationPaths,
} from '../../../helpers/fields.helper';
import { BaseApiService } from '../../../types/service.type';
import { Result } from '../../../../../../nest-tools';
import { HookRegistryService } from '../../../helpers/hook.regestry';

export function GenericBaseCMSService<T>(
  entity: ObjectType<T>,
  registryServiceToken: any
): any {
  @Injectable()
  class GenericServiceHost
    extends BaseApiService
    implements IBaseCmsService<T>
  {
    constructor(
      @InjectRepository(entity)
      private readonly repository: Repository<T>,
      @Inject(registryServiceToken) public hookRegistry: HookRegistryService
    ) {
      super();
    }

    async create(data: T): Promise<Result<T>> {
      return Result.ok(await this.saveWithRelations(data));
    }

    async update(id: number | string, data: Partial<T>): Promise<Result<T>> {
      const beforeHook = this.hookRegistry.getHook(
        `${entity.name}.before.update`
      );
      const afterHook = this.hookRegistry.getHook(
        `${entity.name}.after.update`
      );

      const existingEntity = await this.repository.findOne({
        where: { id: id } as any,
      });
      if (!existingEntity) {
        throw new Error('Entity not found');
      }
      let updatedEntity = Object.assign(existingEntity, data);

      if (beforeHook) {
        updatedEntity = beforeHook(updatedEntity) as Awaited<T> & Partial<T>;
      }

      const savedData = await this.repository.save(updatedEntity);
      if (afterHook) {
        afterHook(savedData);
      }

      return Result.ok(savedData);
    }

    async delete(id: number | string): Promise<Result<any>> {
      return Result.ok(await this.repository.delete(id));
    }

    async batchDelete(entities: T[]): Promise<Result<any>> {
      return Result.ok(await this.repository.remove(entities));
    }

    async batchEdit(
      ids: (string | number)[],
      changes: Partial<T>
    ): Promise<Result<any>> {
      const stringIds = ids.map((id) => id.toString()); // Convert all IDs to strings

      for (let i = 0; i < stringIds.length; i++) {
        await this.update(stringIds[i], changes);
        // const progress = ((i + 1) * 100) / ids.length;
        // this.batchGateway.server.emit('batch', progress);
      }

      return Result.ok(
        await this.repository.find({
          where: { id: In(stringIds) } as any,
        })
      );
    }

    async findAll(): Promise<Result<T[]>> {
      return Result.ok(await this.repository.find());
    }

    public async findByFilter(
      query: PaginateQuery
    ): Promise<Result<Paginated<T>>> {
      return this._findByFilter(query);
    }

    public async _findByFilter(
      query: PaginateQuery
    ): Promise<Result<Paginated<any>>> {
      const relationFields = this.repository.metadata.relations.map(
        (relation) => relation.propertyName as any
      );

      // const filterableColumns = relationFields.reduce((acc, field) => {
      //   acc[field + '_id'] = [FilterOperator.EQ, FilterOperator.GT];
      //   return acc;
      // }, {} as { [key: string]: FilterOperator[] });

      const allColumnNames = this.repository.metadata.columns.map(
        (column) => column.propertyName
      );

      const filterFields = getFilterFields(entity).filter((field) =>
        allColumnNames.includes(field)
      );

      const filterableColumns = filterFields.reduce((acc, field) => {
        acc[field] = [
          FilterOperator.EQ,
          FilterOperator.ILIKE,
          FilterOperator.GT,
          FilterOperator.LT,
          FilterOperator.NULL,
          FilterSuffix.NOT,
        ];
        return acc;
      }, {} as { [key: string]: FilterOperator[] });

      let repo = this.repository.createQueryBuilder('entity');

      for (const field of relationFields) {
        repo = repo.leftJoinAndSelect(`entity.${field}`, field);
      }

      return Result.ok(
        await paginate(query, repo, {
          sortableColumns: filterFields,
          searchableColumns: filterFields,
          filterableColumns: filterableColumns,
          maxLimit: 0,
        })
      );
    }

    async findOne(id: number | string): Promise<Result<any | null>> {
      const beforeHook = this.hookRegistry.getHook(`${entity.name}.before.get`);

      // Gather all relations and their nested relations, using the table name as the prefix
      const relationFields = getRelationPaths(this.repository.metadata);

      let result = await this.repository.findOne({
        where: { id: id } as any,
        relations: relationFields,
      });

      if (beforeHook) {
        result = (await beforeHook(result)) as Awaited<T> & Partial<T>;
      }

      return Result.ok(result);
    }

    async saveWithRelations(entity: any): Promise<any> {
      const newEntity = await this.repository.save(entity);

      const relationFields = this.repository.metadata.relations.map(
        (relation) => relation.propertyName as any
      );

      // Step 2: Fetch it back with relations
      return this.repository.findOne({
        where: { id: newEntity.id } as any,
        relations: relationFields, // Include the relations you want
      });
    }
  }

  return GenericServiceHost;
}
