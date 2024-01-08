import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormController } from '../../controller/form-controller';
import { FormOptions } from '@next-levels/types';

@Component({
  selector: 'nxtlvls-form-set',
  templateUrl: './form-set.component.html',
})
export class FormSetComponent implements OnInit {
  @Input() formFields!: FormOptions[];
  @Input() fields: string[];
  @Input() controller: FormController;
  @Input() readOnly = false;
  @Input() noLabel = false;
  @Input() submitted = false;
  @Output() formValid = new EventEmitter<boolean>();
  fg: FormGroup;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields']) {
      this.changeDetectorRef.detectChanges();
    }
    if (changes['controller']) {
      this.changeDetectorRef.markForCheck();
    }
  }

  trackByFn(index, item) {
    return item.id; // or any unique property of the items
  }

  ngOnInit(): void {
    if (this.formFields || this.fields) {
      this.fg = this.controller.getForm();
    }

    console.log('this.formFields', this.formFields);
    console.log('this.fields', this.fields);
    console.log('this.controller', this.controller);
  }

  isFormValid(event: any) {
    if (!event) {
      return this.formValid.emit(false);
    }

    if (this.formFields) {
      for (let i = 0; i < this.formFields.length; i++) {
        const formFieldName = this.formFields[i]?.name;
        if (
          formFieldName &&
          this.controller?.getForm()?.get(formFieldName)?.invalid
        ) {
          return this.formValid.emit(false);
        }
      }
    } else {
      for (let i = 0; i < this.fields.length; i++) {
        if (this.controller?.getForm()?.get(this.fields[i])?.invalid) {
          return this.formValid.emit(false);
        }
      }
    }
    this.formValid.emit(true);
  }
}
