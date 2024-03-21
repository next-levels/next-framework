import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { ContractStateComponent } from './components/view-items/contract-state/contract-state.component';
import { TableDefaultComponent } from './components/table-default/table-default.component';
import { TableSubmoduleComponent } from './components/table-submodule/table-submodule.component';
import { ViewCurrencyComponent } from './components/view-items/view-currency/view-currency.component';
import { ViewElementComponent } from './components/view-items/view-element/view-element.component';
import { ViewTextComponent } from './components/view-items/view-text/view-text.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BaseTableDefaultComponent } from './components/base-table-default/base-table-default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { MatDialogModule } from '@angular/material/dialog';
import { BaseListComponent } from './components/base-list/base-list.component';
import { ViewRelationComponent } from './components/view-items/view-relation/view-relation.component';
import { defaultListComponents } from './types/default-list-components.type';
import { BaseViewComponent } from './components/view-items/base-view/base-view.component';
import { ViewDateComponent } from './components/view-items/view-date/view-date.component';
import { ViewInlineEditComponent } from './components/view-items/view-inline-edit/view-inline-edit.component';
import { ViewModalComponent } from './components/view-modal/view-modal.component';
import { ViewDropdownComponent } from './components/view-items/view-dropdown/view-dropdown.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListComponents } from '@next-levels/types';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HttpClientModule } from '@angular/common/http';
import { QuerySearchModule } from './components/query-search/query-search.module';
import { ViewImageFileComponent } from './components/view-items/view-imagefile/view-imagefile.component';
import { ViewFileComponent } from './components/view-items/view-file/view-file.component';
import { SimpleListComponent } from './components/simple-list/simple-list.component';
import { RouterLink } from '@angular/router';
import { CardListComponent } from './components/card-list/card-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TableCalendarComponent } from './components/table-calendar/table-calendar.component';
import { TableTreeComponent } from './components/table-tree/table-tree.component';
import {
  MatTree,
  MatTreeModule,
  MatTreeNode,
  MatTreeNodeDef,
  MatTreeNodePadding,
  MatTreeNodeToggle,
} from '@angular/material/tree';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ViewResultComponent } from './components/view-items/view-result.component';
import { ViewCheckboxComponent } from './components/view-items/view-checkbox/view-checkbox.component';
import { TableInlineEditComponent } from './components/table-inline-edit/table-inline-edit.component';
import { FormBuilderModule } from '../../../form-builder';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    TranslocoModule,
    ReactiveFormsModule,
    DatePipe,
    NgOptimizedImage,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    QuerySearchModule,
    RouterLink,
    MatTree,
    MatTreeNode,
    CdkDropList,
    CdkDrag,
    MatTreeNodePadding,
    MatTreeNodeToggle,
    MatTreeNodeDef,
    MatTreeModule,
    FormBuilderModule,
  ],
  providers: [DatePipe],
  declarations: [
    ContractStateComponent,
    TableDefaultComponent,
    TableInlineEditComponent,
    TableCalendarComponent,
    SimpleListComponent,
    CardListComponent,
    TableSubmoduleComponent,
    ContractStateComponent,
    ViewCurrencyComponent,
    ViewElementComponent,
    ViewTextComponent,
    BaseTableDefaultComponent,
    BaseListComponent,
    BaseViewComponent,
    ViewRelationComponent,
    ViewDateComponent,
    ViewImageFileComponent,
    ViewFileComponent,
    ViewInlineEditComponent,
    ViewModalComponent,
    ViewDropdownComponent,
    TableTreeComponent,
    ViewResultComponent,
    ViewCheckboxComponent,
  ],
  exports: [
    ContractStateComponent,
    TableDefaultComponent,
    TableInlineEditComponent,
    TableCalendarComponent,
    SimpleListComponent,
    CardListComponent,
    TableSubmoduleComponent,
    ContractStateComponent,
    ViewCurrencyComponent,
    ViewElementComponent,
    ViewTextComponent,
    BaseTableDefaultComponent,
    BaseListComponent,
    BaseViewComponent,
    ViewRelationComponent,
    ViewDateComponent,
    ViewImageFileComponent,
    ViewFileComponent,
    ViewInlineEditComponent,
    ViewDropdownComponent,
    TableTreeComponent,
    ViewResultComponent,
    ViewCheckboxComponent,
  ],
})
export class ListBuilderModule {
  static forRoot(
    components: ListComponents = defaultListComponents,
    baseUrl: string = ''
  ): ModuleWithProviders<ListBuilderModule> {
    return {
      ngModule: ListBuilderModule,
      providers: [
        { provide: 'listBuilderComponents', useValue: components },
        { provide: 'baseUrl', useValue: baseUrl },
        // Provide a default if no other provider is available.
        {
          provide: 'listBuilderComponents',
          useFactory: () => defaultListComponents,
          deps: [],
        },
      ],
    };
  }
}
