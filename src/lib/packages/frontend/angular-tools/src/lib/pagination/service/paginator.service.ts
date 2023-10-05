import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { State } from 'src/lib/packages/shared/generics/src/index';

@Injectable({
  providedIn: 'root',
})
export abstract class PaginatorService<E, F extends State<E, any>> {
  public _total$ = new BehaviorSubject<number>(0);
  public _entities$ = new BehaviorSubject<E[]>([]);
  public _loading$ = new BehaviorSubject<boolean>(true);
  public _state: State<E, F>;

  get total$(): BehaviorSubject<number> {
    return this._total$;
  }

  set total$(value: BehaviorSubject<number>) {
    this._total$ = value;
  }

  get entities$(): BehaviorSubject<E[]> {
    return this._entities$;
  }

  set entities$(value: BehaviorSubject<E[]>) {
    this._entities$ = value;
  }

  get loading$(): BehaviorSubject<boolean> {
    return this._loading$;
  }

  set loading$(value: BehaviorSubject<boolean>) {
    this._loading$ = value;
  }

  get state(): State<E, F> {
    return this._state;
  }

  set state(value: State<E, F>) {
    this._state = value;
  }
}
