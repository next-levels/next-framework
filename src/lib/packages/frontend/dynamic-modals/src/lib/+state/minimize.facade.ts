import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BaseFacade,
  GenericData,
} from '@nxtlvls/generic-store';
import { MinimizeStore } from './minimize.store';
import { MinimizedModal } from '../data-models/minimized';

@Injectable({
  providedIn: 'root',
})
export class MinimizeFacade extends BaseFacade<
  MinimizedModal,
  GenericData<MinimizedModal>
> {
  constructor(public override store: Store<GenericData<MinimizedModal>>) {
    super(store, MinimizeStore.getActions(), MinimizeStore.getSelectors());
  }

  export(modals: MinimizedModal[]) {
    this.store.dispatch(
      this.baseActions.exportEntities({ payload: { modals } })
    );
  }
}
