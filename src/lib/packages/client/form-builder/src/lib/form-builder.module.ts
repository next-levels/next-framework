import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormElementComponent } from './components/form-element/form-element.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormSetComponent } from './components/form-set/form-set.component';
import { CommonModule } from '@angular/common';
import { QuillEditorComponent } from 'ngx-quill';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BaseInputTextComponent } from './components/base-components/base-input-text.component';
import { BaseInputDropdownComponent } from './components/base-components/base-input-dropdown.component';
import { BaseInputCheckboxComponent } from './components/base-components/base-input-checkbox.component';
import { BaseInputTextareaComponent } from './components/base-components/base-input-textarea.component';
import { BaseInputHtmlComponent } from './components/base-components/base-input-html.component';
import { BaseInputNumberComponent } from './components/base-components/base-input-number.component';
import { BaseInputFileComponent } from './components/base-components/base-input-file.component';
import { BaseInputRelationDropdownComponent } from './components/base-components/base-input-relation-dropdown.component';
import { BaseInputComponent } from './components/base-components/base-input.component';
import { FormComponents } from '@next-levels/types';
import { BaseInputCodeeditorComponent } from './components/base-components/base-input-codeeditor.component';
import { BaseInputJsoneditorComponent } from './components/base-components/base-input-jsoneditor.component';

export interface FormBuilderConfig {
  environment: string;
}

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
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
  ],
  exports: [FormElementComponent, FormElementComponent, FormSetComponent],
  declarations: [
    FormElementComponent,
    BaseInputComponent,
    BaseInputTextComponent,
    BaseInputDropdownComponent,
    BaseInputCheckboxComponent,
    BaseInputTextareaComponent,
    FormSetComponent,
    BaseInputHtmlComponent,
    BaseInputNumberComponent,
    BaseInputFileComponent,
    BaseInputRelationDropdownComponent,
    BaseInputCodeeditorComponent,
    BaseInputJsoneditorComponent,
  ],
})
export class FormBuilderModule {
  static forRoot(
    components: FormComponents,
    baseUrl: string
  ): ModuleWithProviders<FormBuilderModule> {
    return {
      ngModule: FormBuilderModule,
      providers: [
        { provide: 'formBuilderComponents', useValue: components },
        { provide: 'baseUrl', useValue: baseUrl },
      ],
    };
  }
}
