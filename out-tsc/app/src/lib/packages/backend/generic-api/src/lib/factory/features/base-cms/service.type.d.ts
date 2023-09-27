import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Result } from 'src/lib/packages/backend/nest-tools/src/lib/return/result';
export interface IBaseCmsService<T> {
    findAll(): Promise<Result<T[]>>;
    findOne(id: number): Promise<Result<T | null>>;
    findByFilter(query: PaginateQuery, country: string | undefined): Promise<Result<Paginated<T>>>;
    create(data: T): Promise<Result<T>>;
    update(id: number, data: Partial<T>): Promise<Result<T>>;
    delete(id: number): Promise<Result<any>>;
}
