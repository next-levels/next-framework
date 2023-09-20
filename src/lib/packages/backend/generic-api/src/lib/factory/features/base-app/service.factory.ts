import { Inject, Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectType, Repository, SelectQueryBuilder } from 'typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { IBaseApiService } from './service.type';
import { BaseApiService } from './../../../types/service.type';
import { SoftDeleteQueryBuilder } from 'typeorm/query-builder/SoftDeleteQueryBuilder';
import { getFilterFields } from '../../../helpers/fields.helper';
import { HookRegistryService } from '../../../helpers/hook.regestry';
import { Result } from 'src/lib/packages/backend/nest-tools/src/lib/return/result';
export function GenericBaseApiService<T>(
  entity: ObjectType<T>,
  registryServiceToken: any,
  userScope = false
): any {
  @Injectable()
  class GenericServiceHost
    extends BaseApiService
    implements IBaseApiService<T>
  {
    constructor(
      @InjectRepository(entity)
      private readonly repository: Repository<T>,
      @Inject(registryServiceToken) public hookRegistry: HookRegistryService
    ) {
      super();
    }

    getRepoWithScopePipe(
      req: any,
      repo: SelectQueryBuilder<T>
    ): SelectQueryBuilder<T> {
      if (!userScope) return repo;
      const scope_field = 'user_id'; // Make sure this is a valid column name and doesn't come directly from user input
      const scope_id = req.user.userId;
      return repo.where(`entity.${scope_field} = :scope_id`, {
        scope_id: scope_id,
      });
    }

    getRepoWithScope(req: any): SelectQueryBuilder<T> {
      if (!userScope) return this.repository.createQueryBuilder('entity');
      const scope_field = 'user_id'; // Make sure this is a valid column name and doesn't come directly from user input
      const scope_id = req.user.userId;
      return this.repository
        .createQueryBuilder('entity')
        .where(`entity.${scope_field} = :scope_id`, { scope_id: scope_id });
    }
    async create(data: T, req: any): Promise<Result<T>> {
      let newData: T | unknown = { user_id: req.user.userId, ...data };
      const beforeHook = this.hookRegistry.getHook(
        `${entity.name}.before.create`
      );
      const afterHook = this.hookRegistry.getHook(
        `${entity.name}.after.create`
      );

      if (beforeHook) {
        newData = beforeHook(newData);
      }
      const savedData = await this.repository.save(newData as any as T);
      if (afterHook) {
        afterHook(savedData);
      }
      return Result.ok(savedData);
    }

    async delete(id: number, req): Promise<SoftDeleteQueryBuilder<T>> {
      return this.getRepoWithScope(req).softDelete();
    }

    async findAll(@Request() req): Promise<Result<T[]>> {
      return Result.ok(await this.getRepoWithScope(req).getMany());
    }

    public async findByFilter(
      query: PaginateQuery,
      country: string | undefined,
      @Request() req
    ): Promise<Result<Paginated<T>>> {
      return this._findByFilter(query, country, req);
    }

    public async _findByFilter(
      query: PaginateQuery,
      country: string | undefined,
      @Request() req
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
        await paginate(query, this.getRepoWithScopePipe(req, repo), {
          sortableColumns: filterFields,
          searchableColumns: filterFields,
          filterableColumns: filterableColumns,
          maxLimit: 0,
        })
      );
    }

    async findOne(id: number, @Request() req): Promise<Result<T | null>> {
      const entity = await this.getRepoWithScope(req)
        .where('id = ' + id)
        .getOne();
      return Result.ok(entity);
    }

    async update(id: number, data: Partial<T>, req): Promise<Result<T>> {
      const entity = await this.getRepoWithScope(req)
        .where('id = ' + id)
        .getOne();
      Object.assign(entity, data);
      const entityNew = await this.repository.save(entity);
      return Result.ok(entityNew);
    }
  }

  return GenericServiceHost;
}
