import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HttpClientModule } from '@angular/common/http';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryInputComponent } from './components/query-input/query-input.component';
import { MaterialModule } from './material-module';
 import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

 import { TranslateModule } from '@ngx-translate/core';
import { SaveQueryDialogComponent } from './components/save-query-dialog/save-query-dialog.component';
import {FormBuilderModule} from "../../../../../form-builder/src/lib/form-builder.module"


@NgModule({
  declarations: [
    QueryInputComponent,
     SaveQueryDialogComponent,
  ],
  imports: [
    CommonModule,
    NgbNavModule,
     RouterModule,
     InlineSVGModule,
    NgbCollapseModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbDropdownModule,
    NgbTooltipModule,

    ScrollingModule,
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    NgbModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatRippleModule,
    MatIconModule,
    FormBuilderModule,
    TranslateModule,
  ],
  exports: [QueryInputComponent],
})
export class QuerySearchModule {}
