 import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { SoftDeleteQueryBuilder } from 'typeorm/query-builder/SoftDeleteQueryBuilder';
 import {Result} from "@next-levels/next-framework";
  export interface IBaseApiService<T> {
  findAll(req): Promise<Result<T[]>>;
  findOne(id: number, req): Promise<Result<T | null>>;
  findByFilter(
    query: PaginateQuery,req
  ): Promise<Result<Paginated<T>>>;
  create(data: T & { user_id?: any }, req: any): Promise<Result<T>>;
  update(id: number, data: Partial<T>, req): Promise<Result<T>>;
  delete(id: number, req): Promise<SoftDeleteQueryBuilder<T>>;
}
