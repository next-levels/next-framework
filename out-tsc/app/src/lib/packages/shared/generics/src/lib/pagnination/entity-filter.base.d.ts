import { SortColumn, SortDirection } from './sort.type';
import { State } from './state.type';
import { EntityTagFilter } from './entity.type';
/***
 * E: Entity
 * F: Filter
 */
export declare abstract class EntityFilter<E, F extends EntityTagFilter> implements State<E, F> {
    abstract filter: F;
    abstract page: number;
    abstract pageSize: number;
    abstract searchTerm: string;
    abstract sortColumn: SortColumn<E>;
    abstract sortDirection: SortDirection;
}
