import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormBuilderModule } from '@nxtlvls/form-builder';
import { TranslateModule } from '@ngx-translate/core';
import { QuillEditorComponent } from 'ngx-quill';
import { InputTextComponent } from './form-elements/input-text/input-text.component';
import { InputTextareaComponent } from './form-elements/input-textarea/input-textarea.component';
import { InputDropdownComponent } from './form-elements/input-dropdown/input-dropdown.component';
import { InputHtmlComponent } from './form-elements/input-html/input-html.component';
import { InputNumberComponent } from './form-elements/input-number/input-number.component';
import { InputRelationDropdownComponent } from './form-elements/input-relation-dropdown/input-relation-dropdown.component';
import { InputFileComponent } from './form-elements/input-file/input-file.component';
import { IonicModule } from '@ionic/angular';
import { MatSelectModule } from '@angular/material/select';
import { InputDateComponent } from './form-elements/input-date/input-date.component';
import { InputSignComponent } from './form-elements/input-sign/input-sign.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputDropdownRadioComponent } from './form-elements/input-dropdown-radio/input-dropdown-radio.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    TranslateModule,
    QuillEditorComponent,
    IonicModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports: [],
  declarations: [
    InputTextComponent,
    InputTextareaComponent,
    InputDropdownComponent,
    InputHtmlComponent,
    InputNumberComponent,
    InputRelationDropdownComponent,
    InputFileComponent,
    InputDateComponent,
    InputSignComponent,
    InputDropdownRadioComponent,
  ],
})
export class IonicFormBuilderModule {
  static forRoot(baseUri: string): ModuleWithProviders<IonicFormBuilderModule> {
    return {
      ngModule: IonicFormBuilderModule,
      providers: [
        {
          provide: 'baseUrl',
          useValue: baseUri,
        },
        ...FormBuilderModule.forRoot(
          {
            HIDDEN: InputTextareaComponent,
            TEXT: InputTextComponent,
            CURRENCY: InputTextComponent,
            TEXTAREA: InputTextareaComponent,
            DROPDOWN: InputDropdownComponent,
            RADIO: InputDropdownRadioComponent,
            HTML: InputHtmlComponent,
            DATE: InputDateComponent,
            NUMBER: InputNumberComponent,
            CHECKBOX: InputTextComponent,
            RELATION: InputRelationDropdownComponent,
            FILE: InputFileComponent,
            SIGN: InputSignComponent,
          },
          baseUri
        ).providers,
      ],
    };
  }
}
