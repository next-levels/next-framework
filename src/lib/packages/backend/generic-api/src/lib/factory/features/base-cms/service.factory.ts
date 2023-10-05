import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectType, Repository } from 'typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { IBaseCmsService } from './service.type';
import { getFilterFields } from '../../../helpers/fields.helper';
import { BaseApiService } from '../../../types/service.type';
import { Result } from '../../../../../../../../../../src/lib/packages/backend/nest-tools/src/lib/return/result';

export function GenericBaseCMSService<T>(entity: ObjectType<T>): any {
  @Injectable()
  class GenericServiceHost
    extends BaseApiService
    implements IBaseCmsService<T>
  {
    constructor(
      @InjectRepository(entity)
      private readonly repository: Repository<T>
    ) {
      super();
    }

    async create(data: T): Promise<Result<T>> {
      return Result.ok(await this.saveWithRelations(data));
    }

    async delete(id: number): Promise<Result<any>> {
      return Result.ok(await this.repository.delete(id));
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
      const filterableColumns = relationFields.reduce((acc, field) => {
        acc[field + '_id'] = [FilterOperator.EQ, FilterOperator.GT];
        return acc;
      }, {} as { [key: string]: FilterOperator[] });

      const allColumnNames = this.repository.metadata.columns.map(
        (column) => column.propertyName
      );
      const filterFields = getFilterFields(entity).filter((field) =>
        allColumnNames.includes(field)
      );

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

    findOne(id: number): Promise<Result<T | null>> {
      return Promise.resolve(undefined);
    }

    update(id: number, data: Partial<T>): Promise<Result<T>> {
      return Promise.resolve(undefined);
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
