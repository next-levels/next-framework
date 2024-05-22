import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchQuery } from '../../models/search-queries.model';
import { InstanceRegistryService } from '@next-levels/next-framework-client';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'save-query-dialog',
  templateUrl: './save-query-dialog.component.html',
})
export class SaveQueryDialogComponent implements OnInit {
  public searchQueryForm: FormGroup;

  @Input() public searchQuery: SearchQuery;

  constructor(
    private readonly _matDialog: MatDialog,
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

      this._matDialog.closeAll();
    }
  }

  /**
   * Dismiss dialog box
   */
  public onDismiss() {
    this._matDialog.closeAll();
  }
}
