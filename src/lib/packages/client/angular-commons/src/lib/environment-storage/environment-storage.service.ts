import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentStorageService {
  private static instance: EnvironmentStorageService;
  public baseUrl = 'http://localhost:3333';
  public baseSocket = 'http://localhost:3333';

  private constructor() {}

  public static getInstance(): EnvironmentStorageService {
    if (!EnvironmentStorageService.instance) {
      EnvironmentStorageService.instance = new EnvironmentStorageService();
    }
    return EnvironmentStorageService.instance;
  }

  setConfig(config: { baseUrl: string }): void {
    this.baseUrl = config.baseUrl;
    this.baseSocket = config.baseUrl;
  }
}
