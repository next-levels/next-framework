import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentStorageService {
  public baseUrl = 'http://localhost:3333';
  public baseSocket = 'http://localhost:3333';
  setConfig(config: { baseUrl: string }): void {
    this.baseUrl = config.baseUrl;
    this.baseSocket = config.baseUrl;
  }
}
