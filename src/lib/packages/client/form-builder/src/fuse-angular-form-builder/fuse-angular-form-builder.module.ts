import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { QuillEditorComponent } from 'ngx-quill';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InputTextComponent } from './form-elements/input-text/input-text.component';
import { InputTextareaComponent } from './form-elements/input-textarea/input-textarea.component';
import { InputDropdownComponent } from './form-elements/input-dropdown/input-dropdown.component';
import { InputHtmlComponent } from './form-elements/input-html/input-html.component';
import { InputNumberComponent } from './form-elements/input-number/input-number.component';
import { InputRelationDropdownComponent } from './form-elements/input-relation-dropdown/input-relation-dropdown.component';
import { InputFileComponent } from './form-elements/input-file/input-file.component';
import { InputCheckboxComponent } from './form-elements/input-checkbox/input-checkbox.component';
import { InputDateComponent } from './form-elements/input-date/input-date.component';
import { FormBuilderModule } from '../lib/form-builder.module';
import { InputCodeeditorComponent } from './form-elements/input-codeeditor/input-codeeditor.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { InputJsoneditorComponent } from './form-elements/input-jsoneditor/input-jsoneditor.component';
import { InputCurrencyComponent } from './form-elements/input-currency/input-currency.component';
import { NgxCurrencyDirective } from 'ngx-currency';
import { InputImageFileComponent } from './form-elements/input-imagefile/input-imagefile.component';
import { ListSelectorComponent } from './list-selector/list-selector.component';
import { InputMultiImageFileComponent } from './form-elements/input-multiimagefile/input-multiimagefile.component';
import {
  CdkDrag,
  CdkDropListGroup,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { InputMultiImageFileDirective } from './form-elements/input-multiimagefile/input-multiimagefile.directive';
import { CodeEditorModule } from '@ngstack/code-editor';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    TranslateModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    QuillEditorComponent,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    NgJsonEditorModule,
    NgxCurrencyDirective,
    CodeEditorModule.forRoot(),
    FormsModule,
    CdkDrag,
    CdkDropListGroup,
    DragDropModule,
  ],
  exports: [InputMultiImageFileDirective],
  declarations: [
    InputTextComponent,
    InputTextareaComponent,
    InputDropdownComponent,
    InputHtmlComponent,
    InputCurrencyComponent,
    InputNumberComponent,
    InputRelationDropdownComponent,
    InputFileComponent,
    InputImageFileComponent,
    InputMultiImageFileComponent,
    InputCheckboxComponent,
    InputDateComponent,
    InputCodeeditorComponent,
    InputJsoneditorComponent,
    ListSelectorComponent,
    InputMultiImageFileDirective,
  ],
})
export class FuseAngularFormBuilderModule {
  static forRoot(): ModuleWithProviders<FuseAngularFormBuilderModule> {
    return {
      ngModule: FuseAngularFormBuilderModule,
      providers: [
        ...FormBuilderModule.forRoot({
          HIDDEN: InputTextareaComponent,
          TEXT: InputTextComponent,
          CURRENCY: InputCurrencyComponent,
          TEXTAREA: InputTextareaComponent,
          DROPDOWN: InputDropdownComponent,
          RADIO: InputDropdownComponent,
          HTML: InputHtmlComponent,
          DATE: InputDateComponent,
          NUMBER: InputNumberComponent,
          CHECKBOX: InputCheckboxComponent,
          RELATION: InputRelationDropdownComponent,
          FILE: InputFileComponent,
          IMAGEFILE: InputImageFileComponent,
          MULTIIMAGEFILE: InputMultiImageFileComponent,
          SIGN: InputFileComponent,
          CODE: InputCodeeditorComponent,
          JSON: InputJsoneditorComponent,
          RESULT: InputNumberComponent,
          LISTSELECTOR: ListSelectorComponent,
        }).providers,
      ],
    };
  }
}
