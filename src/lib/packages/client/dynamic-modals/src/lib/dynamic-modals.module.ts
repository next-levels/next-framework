import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateWizardComponent } from './components/create-wizard/create-wizard.component';
import { TranslateModule } from '@ngx-translate/core';
import { MinimizeStore } from './+state/minimize.store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MinimizeEffects } from './+state/minimize.effects';
import { MinimizeFacade } from './+state/minimize.facade';
import { MinimizeService } from './services/minimize/minimize.service';
import { SwalService } from './services/swal/swal.service';
import { BatchWizardComponent } from './components/batch-wizard/batch-wizard.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';
import { ViewModalComponent } from './components/view-modal/view-modal.component';
import { MatTableModule } from '@angular/material/table';
import { FormBuilderModule } from '../../../form-builder/public_api';
import { ListBuilderModule } from '../../../list-builder/src';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

const store = new MinimizeStore();

@NgModule({
  declarations: [
    CreateWizardComponent,
    BatchWizardComponent,
    ViewModalComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(store.featureKey, store.baseReducers),
    EffectsModule.forFeature([MinimizeEffects]),
    TranslateModule,
    MatStepperModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    TranslocoModule,
    FormBuilderModule,
    MatTableModule,
    ListBuilderModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    NgbTooltipModule,
  ],
  exports: [CreateWizardComponent, BatchWizardComponent, ViewModalComponent],
  providers: [
    {
      provide: MinimizeStore,
      useValue: store,
    },
    MinimizeFacade,
    MinimizeService,
    SwalService,
  ],
})
export class DynamicModalsModule {}
