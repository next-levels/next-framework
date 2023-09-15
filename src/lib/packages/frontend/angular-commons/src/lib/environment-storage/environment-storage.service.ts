import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentStorageService {
  public baseUrl = '';
  setConfig(config: { baseUrl: string }): void {
    this.baseUrl = config.baseUrl;
  }
}
