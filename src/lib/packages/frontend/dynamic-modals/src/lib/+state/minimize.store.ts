import {
  BaseStore,
  GenericData,
  createGenericActions,
  createGenericReducer,
} from '../../../../generic-store/src';
import { MinimizedModal } from '../data-models/minimized';

export class MinimizeStore extends BaseStore<
  MinimizedModal,
  GenericData<MinimizedModal>
> {
  override baseActions: any;
  constructor() {
    super('minimized');

    this.baseReducers = createGenericReducer(
      this.entityName,
      this.baseActions as unknown as ReturnType<typeof createGenericActions>,
      this.adapter
    );
  }
  static getReducers() {
    return new MinimizeStore().baseReducers;
  }

  static getActions() {
    return new MinimizeStore().baseActions;
  }

  static getSelectors() {
    return new MinimizeStore().baseSelectors;
  }
}
