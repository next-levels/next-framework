import { Store } from '@ngrx/store';
import { MinimizedModal } from '../data-models/minimized';
import { BaseFacade, GenericData } from '../../../../generic-store/src';
export declare class MinimizeFacade extends BaseFacade<MinimizedModal, GenericData<MinimizedModal>> {
    store: Store<GenericData<MinimizedModal>>;
    constructor(store: Store<GenericData<MinimizedModal>>);
    export(modals: MinimizedModal[]): void;
}
