import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentStorageService {
  baseUrl = '';

  constructor() {}

  setConfig(config: { baseUrl: string }): void {
    this.baseUrl = config.baseUrl;
  }
}
