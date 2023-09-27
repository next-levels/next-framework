import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MinimizedModal } from '../../data-models/minimized';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from '../../../../../generic-store/public_api';
export declare enum ComponentInstanceTypes {
    AgencyModel = "Agentur",
    CustomerModel = "Kunde",
    ContractModel = "Vertrag",
    InsurerModel = "Versicherer"
}
export declare class MinimizeService implements BaseService<MinimizedModal> {
    private readonly _matDialog;
    private store;
    constructor(_matDialog: MatDialog, store: Store);
    getLocalStorageKey(): string;
    getAll(): Observable<any>;
    findByFilter(): Observable<any>;
    getEntity(): Observable<MinimizedModal>;
    addEntity(componentInstance: any): Observable<MinimizedModal>;
    updateEntity(): Observable<any>;
    deleteEntity(modal: any): Observable<any>;
    getComponentInstanceType(modelName: string): ComponentInstanceTypes;
    setMinimizerOptions(componentInstance: any): MinimizedModal;
    removeCircularReferences(minimizedModal: MinimizedModal): string;
    minimizeCurrentModal(componentInstance: any): void;
    isCyclic(obj: any): boolean;
    getMinimizedModals(): any;
    openMinimizedModal(modalString: any): void;
    deleteMinimizedModal(modal: MinimizedModal): void;
}
