import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { MinimizeStore } from './minimize.store';
import { MinimizedModal } from '../data-models/minimized';
import { TranslateService } from '@ngx-translate/core';
import { GenericEffects } from '../../../../generic-store/src';
import { MinimizeService } from '../services/minimize/minimize.service';
@Injectable()
export class MinimizeEffects extends GenericEffects<MinimizedModal> {
  constructor(
    actions$: Actions,
    private minimizeService: MinimizeService,
    private minimizeStore: MinimizeStore,
    public translateService: TranslateService
  ) {
    super(
      actions$,
      minimizeService,
      minimizeStore.baseActions as any,
      'MinimizedModal',
      'MinimizedModal',
      translateService
    );
  }
}
