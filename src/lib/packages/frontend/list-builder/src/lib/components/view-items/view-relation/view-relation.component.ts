import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'nxtlvls-view-relation',
  templateUrl: './view-relation.component.html',
  styleUrls: ['./view-relation.component.scss'],
})
export class ViewRelationComponent extends BaseViewComponent implements OnInit {
  detail_fields: any[] = [];
  constructor(
    public override cdRef: ChangeDetectorRef,
    public router: Router,
    public store: Store<any>
  ) {
    super(cdRef);
  }
  override ngOnInit() {
    super.ngOnInit();

    if (
      this.listField &&
      this.listField.type === 'RELATION' &&
      this.listField.options &&
      this.listField.options.selector
    ) {
      if (this.listField.options.selector.includes('.')) {
        const fieldNameArray = this.listField.options.selector.split('.');
        if (
          this.viewObject[fieldNameArray[0]] &&
          this.viewObject[fieldNameArray[0]][fieldNameArray[1]]
        )
          this._value = this.viewObject[fieldNameArray[0]][fieldNameArray[1]];
      }
    }

    if (
      this.listField &&
      this.listField.type === 'RELATION' &&
      this.listField.options &&
      this.listField.options.map
    ) {
      let forign_id;
      if (this.listField.options.map.includes('.')) {
        const fieldNameArray = this.listField.options.map.split('.');
        forign_id = this.viewObject[fieldNameArray[0]][fieldNameArray[1]];
      }

      let settings = this.listController
        .getModelDefinition()
        .relations(this.fieldName);

      if (settings.action !== undefined && settings.selector !== undefined) {
        this.store.dispatch(settings.action);

        this.store.pipe(select(settings.selector)).subscribe((data) => {
          if (!data || data.length === 0) return;
          this._value = this.mapData(
            settings.fields,
            data.find((item: any) => item.id === forign_id)
          );
          this.cdRef.detectChanges();
        });
      }
    }

    if (
      this.listField &&
      this.detailView &&
      this.listField.type === 'RELATION' &&
      this.listField.options &&
      this.listField.options.detail_fields
    ) {
      this.detail_fields = this.mapDataDetails(
        this.listField.options.detail_fields,
        this.viewObject
      );
    }
  }

  mapData(fields, data: any) {
    const fieldValues = [];

    fields.forEach((field) => {
      let value = data;
      field.split('.').forEach((key) => {
        value = value ? value[key] : null;
      });
      if (value !== null) fieldValues.push(value);
    });

    return fieldValues[0];
  }

  mapDataDetails(fields, data: any) {
    const fieldValues = [];

    fields.forEach((field) => {
      let value = data;
      field.split('.').forEach((key) => {
        value = value ? value[key] : null;
      });
      if (value !== null)
        fieldValues.push({
          label: field.split('.')[0] + '.properties.' + field.split('.')[1],
          value: value,
        });
    });

    return fieldValues;
  }

  openRelation() {
    return;
    if (
      this.listField &&
      this.listField.options &&
      this.listField.options.selector
    ) {
      if (this.listField.options.selector.includes('.')) {
        const fieldNameArray = this.listField.options.selector.split('.');
        let url = fieldNameArray[0];
        if (this.listField.options.model) {
          url =
            this.listController.getModelOptions(this.listField.options.model)
              .url ?? fieldNameArray[0];
        }

        this.router
          .navigateByUrl(
            '/' + url + '/' + this.viewObject[fieldNameArray[0]]['id']
          )
          .then((r) => r);
      }
    }
  }
}
