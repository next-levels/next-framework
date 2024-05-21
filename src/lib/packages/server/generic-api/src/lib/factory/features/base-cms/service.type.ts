import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Result } from '@next-levels/next-framework';

export interface IBaseCmsService<T> {
  findAll(): Promise<Result<T[]>>;

  findOne(id: string | number): Promise<Result<T | null>>;

  findByFilter?(
    query: PaginateQuery,
    country: string | undefined
  ): Promise<Result<Paginated<T>>>;

  create(data: T): Promise<Result<T>>;

  update(id: string | number, data: Partial<T>): Promise<Result<T>>;

  delete(id: string | number): Promise<Result<any>>;

  batchDelete(entities: T[]): Promise<Result<any>>;

  batchEdit(
    ids: string[] | number[],
    changes: Partial<T>
  ): Promise<Result<any>>;
}
