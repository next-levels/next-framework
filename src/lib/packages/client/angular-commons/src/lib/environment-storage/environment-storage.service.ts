import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentStorageService {
  public baseUrl = 'http://localhost:3000';
  setConfig(config: { baseUrl: string }): void {
    this.baseUrl = config.baseUrl;
  }
}
