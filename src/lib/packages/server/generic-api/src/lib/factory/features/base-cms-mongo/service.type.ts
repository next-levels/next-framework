import { Paginated, PaginateQuery } from 'nestjs-paginate';
import {Result} from "@next-levels/next-framework";
export interface IBaseCmsServiceMongo<T> {
  findAll(): Promise<Result<T[]>>;
  findOne(id: string): Promise<Result<T | null>>;
  findByFilter?(
    query: any
  ): Promise<Result<Paginated<T>>>;
  create(data: T): Promise<any>;
  update(id: string, data: Partial<T>): Promise<Result<T>>;
  delete(id: string): Promise<Result<any>>;
}
