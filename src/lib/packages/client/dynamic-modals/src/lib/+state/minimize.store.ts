import {
  BaseStore,
  GenericData,
  createGenericActions,
 } from '../../../../generic-store/src';
import { MinimizedModal } from '../data-models/minimized';
import {createBaseReducers} from "../../../../generic-store/src/lib/+state/base.reducers";

export class MinimizeStore extends BaseStore<
  MinimizedModal,
  GenericData<MinimizedModal>
> {
  override baseActions: any;
  constructor() {
    super('minimized');

    this.baseReducers = createBaseReducers(
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
