import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PaginatorService } from '../pagination/service/paginator.service';
import { SortDirection, State } from 'src/lib/packages/shared/generics/src/index';

export abstract class PaginationPart<
  P extends PaginatorService<any, State<any, any>>,
  E,
  S
> {
  totalCount: number;
  pagCount: number;
  searchterm: string;
  private _items$: Observable<E[]>;
  private storePag: Store<S>;
  public paginatorService: P;

  private queryAction: () => void;
  public openModalAction: (item: E) => void;

  get items$(): Observable<E[]> {
    return this._items$;
  }

  set items$(value: Observable<E[]>) {
    this._items$ = value;
  }
  public query(sort: SortDirection = 'asc') {
    this.queryAction();
  }

  public openModal(item: any) {
    this.openModalAction(item);
  }
}
