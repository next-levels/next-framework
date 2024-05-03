import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';
import { EnvironmentStorageService } from '../../../../../../angular-commons/src/lib/environment-storage/environment-storage.service';

@Component({
  selector: 'vosdellen-view-imagefile',
  templateUrl: './view-imagefile.component.html',
  styleUrls: ['./view-imagefile.component.scss'],
})
export class ViewImageFileComponent
  extends BaseViewComponent
  implements OnInit
{
  baseUrl = '';

  constructor(
    public override cdRef: ChangeDetectorRef,
    private environmentStorage: EnvironmentStorageService
  ) {
    super(cdRef);
    this.baseUrl = this.environmentStorage.baseUrl;
  }
  override ngOnInit() {
    super.ngOnInit();
    if (this.listField?.options?.base_path) {
      this.baseUrl = this.baseUrl + this.listField.options.base_path;
    } else {
      this.baseUrl = this.baseUrl + '/api/files/';
    }
    if (this._value) {
      if (this._value.indexOf('https://') !== 0) {
        this._value = this.baseUrl + this._value;
      }
    } else {
      this._value = false;
    }
  }
}
