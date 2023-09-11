import { Component } from '@angular/core';
import { BaseInputHtmlComponent } from '@nxtlvls/form-builder';

@Component({
  selector: 'nxt-input-html',
  templateUrl: './input-html.component.html',
})
export class InputHtmlComponent extends BaseInputHtmlComponent {
  public quillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
  };

  onEventChange(event: any) {
    if (event.value) {
      this.dataOutput.emit(event.value.toISOString());
    }
  }
}
