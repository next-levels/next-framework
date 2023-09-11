import { Injectable } from '@angular/core';
import { BasicFacade } from '../types/base.type';

@Injectable({
  providedIn: 'root',
})
export class FacadeRegistry {
  static facades: Record<string, BasicFacade<any>> = {};

  static registerFacade(name: string, facade: BasicFacade<any>): void {
    FacadeRegistry.facades[name] = facade;
  }

  static getFacade(name: string): BasicFacade<any> | undefined {
    return FacadeRegistry.facades[name];
  }
}
