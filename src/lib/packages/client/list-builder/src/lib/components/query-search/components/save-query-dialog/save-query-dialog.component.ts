import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {SearchQuery} from "../../models/search-queries.model";
import {InstanceRegistryService} from "@next-levels/next-framework-client";

@Component({
  selector: 'save-query-dialog',
  templateUrl: './save-query-dialog.component.html',
})
export class SaveQueryDialogComponent implements OnInit {
  public searchQueryForm: FormGroup;

  @Input() public searchQuery: SearchQuery;

  constructor(
    public activeModal: NgbActiveModal,
    private regestry: InstanceRegistryService,
    private _formBuilder: FormBuilder
  ) {}

  /**
   * Initialize component
   */
  public ngOnInit() {
    this.searchQueryForm = this._formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  /**
   * Add search query to store
   */
  public onSubmit() {
    if (this.searchQueryForm.valid && this.searchQuery) {

      this.regestry.retrieve(SearchQuery).base.add({
        ...this.searchQuery,
        ...this.searchQueryForm.value,
      });

      this.activeModal.close();
    }
  }

  /**
   * Dismiss dialog box
   */
  public onDismiss() {
    this.activeModal.dismiss();
  }
}
