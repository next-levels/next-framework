import { Observable } from 'rxjs';
import { PaginatorService } from '../pagination/service/paginator.service';
import { SortDirection, State } from '@nxtlvls/generic-types';
export declare abstract class PaginationPart<P extends PaginatorService<any, State<any, any>>, E, S> {
    totalCount: number;
    pagCount: number;
    searchterm: string;
    private _items$;
    private storePag;
    paginatorService: P;
    private queryAction;
    openModalAction: (item: E) => void;
    get items$(): Observable<E[]>;
    set items$(value: Observable<E[]>);
    query(sort?: SortDirection): void;
    openModal(item: any): void;
}
