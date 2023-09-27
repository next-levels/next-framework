import { Result } from '@nxtlvls/nest-tools';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { SoftDeleteQueryBuilder } from 'typeorm/query-builder/SoftDeleteQueryBuilder';
export interface IBaseApiService<T> {
    findAll(req: any): Promise<Result<T[]>>;
    findOne(id: number, req: any): Promise<Result<T | null>>;
    findByFilter(query: PaginateQuery, country: string | undefined, req: any): Promise<Result<Paginated<T>>>;
    create(data: T & {
        user_id?: any;
    }, req: any): Promise<Result<T>>;
    update(id: number, data: Partial<T>, req: any): Promise<Result<T>>;
    delete(id: number, req: any): Promise<SoftDeleteQueryBuilder<T>>;
}
