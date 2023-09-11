import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseService } from 'libs/angular/features/generic-store/src';
import { Observable, map, of } from 'rxjs';
import { MinimizedModal } from '../../data-models/minimized';
import { CreateWizardComponent } from '../../components/create-wizard/create-wizard.component';
import { META } from '@nxtlvls/generic-types';
import { MatDialog } from '@angular/material/dialog';
import { FormController } from '@nxtlvls/form-builder';

export enum ComponentInstanceTypes {
  AgencyModel = 'Agentur',
  CustomerModel = 'Kunde',
  ContractModel = 'Vertrag',
  InsurerModel = 'Versicherer',
}

@Injectable({
  providedIn: 'root',
})
export class MinimizeService implements BaseService<MinimizedModal> {
  constructor(private readonly _matDialog: MatDialog, private store: Store) {}

  getLocalStorageKey() {
    return 'minimized_modals_';
  }

  getAll() {
    return of(
      JSON.parse(localStorage.getItem(this.getLocalStorageKey()) ?? '[]')
    );
  }

  findByFilter() {
    return of(
      JSON.parse(localStorage.getItem(this.getLocalStorageKey()) ?? '[]')
    );
  }

  getEntity(): Observable<MinimizedModal> {
    return of({} as any);
  }

  addEntity(componentInstance: any) {
    componentInstance.type = this.getComponentInstanceType(
      componentInstance.model.constructor.name
    );

    const modal: MinimizedModal = this.setMinimizerOptions(componentInstance);

    const minimizedModals = this.getMinimizedModals();

    minimizedModals.push(modal);

    // localStorage.setItem(
    //   this.getLocalStorageKey(),
    //   JSON.stringify(minimizedModals, this.getCircularReplacer())
    // );

    return of(modal);
  }

  updateEntity() {
    return of({} as any);
  }

  deleteEntity(modal: any) {
    const minimizedModals = this.getMinimizedModals();
    const index = minimizedModals.findIndex(
      (minimizedModal: MinimizedModal) =>
        minimizedModal.last_changes === modal.last_changes
    );

    minimizedModals.splice(index, 1);

    localStorage.setItem(
      this.getLocalStorageKey(),
      JSON.stringify(minimizedModals)
    );

    return of({} as any);
  }

  getComponentInstanceType(modelName: string) {
    switch (modelName) {
      case 'AgencyModel':
        return ComponentInstanceTypes.AgencyModel;
        break;
      case 'CustomerModel':
        return ComponentInstanceTypes.CustomerModel;
        break;
      case 'ContractModel':
        return ComponentInstanceTypes.ContractModel;
        break;
      case 'InsurerModel':
        return ComponentInstanceTypes.InsurerModel;
        break;
      default:
        return undefined;
        break;
    }
  }

  setMinimizerOptions(componentInstance: any): MinimizedModal {
    const { modelDefinition, store, ...restOfFormController } =
      componentInstance.formController;

    return {
      type: componentInstance.type,
      last_changes: new Date().getTime().toString(),
      steps: componentInstance.steps,
      model: componentInstance.model,
      formValues: componentInstance.formController.form.value,
    };
  }

  removeCircularReferences(minimizedModal: MinimizedModal) {
    const seen = new WeakSet();
    return JSON.stringify(minimizedModal, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    });
  }

  minimizeCurrentModal(componentInstance: any) {
    /*  componentInstance.type = this.getComponentInstanceType(
        componentInstance.model.constructor.name
      );
  */
    componentInstance.type = META.getNameByModel(componentInstance.model);
    const modal: MinimizedModal = this.setMinimizerOptions(componentInstance);
    const minimizedModals = this.getMinimizedModals();
    minimizedModals.push(modal);

    localStorage.setItem(
      this.getLocalStorageKey(),
      JSON.stringify(minimizedModals)
    );
  }

  isCyclic(obj: any) {
    let seenObjects: any = [];

    function detect(obj: any) {
      if (obj && typeof obj === 'object') {
        if (seenObjects.indexOf(obj) !== -1) {
          return true;
        }
        seenObjects.push(obj);
        for (var key in obj) {
          if (obj.hasOwnProperty(key) && detect(obj[key])) {
            console.log(obj, 'is cyclic at key', key);
            return true;
          }
        }
      }
      return false;
    }

    return detect(obj);
  }

  getMinimizedModals() {
    const test = JSON.parse(
      localStorage.getItem(this.getLocalStorageKey()) ?? '[]'
    );

    return JSON.parse(localStorage.getItem(this.getLocalStorageKey()) ?? '[]');
  }

  openMinimizedModal(modalString: any) {
    const modal = modalString as MinimizedModal;
    this._matDialog
      .open(CreateWizardComponent, {
        autoFocus: false,
        minWidth: '50%',
        data: {
          model: META.getModelByName(modal.type),
          formController: new FormController(
            modal.formValues,
            this.store,
            META.getModelByName(modal.type)
          ),
        },
      })
      .afterClosed()
      .subscribe(() => {});
  }

  deleteMinimizedModal(modal: MinimizedModal) {
    const minimizedModals = this.getMinimizedModals();
    const index = minimizedModals.findIndex(
      (minimizedModal: MinimizedModal) =>
        minimizedModal.last_changes === modal.last_changes
    );

    minimizedModals.splice(index, 1);

    // localStorage.setItem(
    //   this.getLocalStorageKey(),
    //   JSON.stringify(minimizedModals, this.removeCircularReferences())
    // );
  }
}
