import { Actions } from '@ngrx/effects';
import { MinimizeStore } from './minimize.store';
import { MinimizedModal } from '../data-models/minimized';
import { TranslateService } from '@ngx-translate/core';
import { GenericEffects } from '../../../../generic-store/src';
import { MinimizeService } from '../services/minimize/minimize.service';
export declare class MinimizeEffects extends GenericEffects<MinimizedModal> {
    private minimizeService;
    private minimizeStore;
    translateService: TranslateService;
    constructor(actions$: Actions, minimizeService: MinimizeService, minimizeStore: MinimizeStore, translateService: TranslateService);
}
