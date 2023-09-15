import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';
import { DatePipe } from '@angular/common';
import { EnvironmentStorageService } from '../../../../../../angular-commons/src/lib/environment-storage/environment-storage.service';

@Component({
  selector: 'vosdellen-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss'],
})
export class ViewFileComponent extends BaseViewComponent implements OnInit {
  baseUrl = '';

  constructor(
    private datePipe: DatePipe,
    public cdRef: ChangeDetectorRef,
    private environmentStorage: EnvironmentStorageService
  ) {
    super(cdRef);
    this.baseUrl = this.environmentStorage.baseUrl;
  }
  ngOnInit() {
    super.ngOnInit();
    this._value = this.baseUrl + '/files/' + this._value;
  }
}
