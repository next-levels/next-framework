import { BaseStore, GenericData } from '../../../../generic-store/src';
import { MinimizedModal } from '../data-models/minimized';
export declare class MinimizeStore extends BaseStore<MinimizedModal, GenericData<MinimizedModal>> {
    baseActions: any;
    constructor();
    static getReducers(): import("@ngrx/store").ActionReducer<import("@ngrx/entity").EntityState<MinimizedModal>, import("@ngrx/store").Action>;
    static getActions(): any;
    static getSelectors(): import("../../../../generic-store/src/lib/types/base.selectors").BaseSelectors<MinimizedModal, GenericData<MinimizedModal>>;
}
