import { BehaviorSubject } from 'rxjs';
import { State } from '@nxtlvls/generic-types';
export declare abstract class PaginatorService<E, F extends State<E, any>> {
    _total$: BehaviorSubject<number>;
    _entities$: BehaviorSubject<E[]>;
    _loading$: BehaviorSubject<boolean>;
    _state: State<E, F>;
    get total$(): BehaviorSubject<number>;
    set total$(value: BehaviorSubject<number>);
    get entities$(): BehaviorSubject<E[]>;
    set entities$(value: BehaviorSubject<E[]>);
    get loading$(): BehaviorSubject<boolean>;
    set loading$(value: BehaviorSubject<boolean>);
    get state(): State<E, F>;
    set state(value: State<E, F>);
}
