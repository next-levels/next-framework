import { Injectable } from '@angular/core';
import { EnvironmentStorageService } from './environment-storage/environment-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  constructor(private env: EnvironmentStorageService) {}

  loadConfig(environments: any[]) {
    let currentOrigin = window.location.origin;

    if (currentOrigin.includes('localhost')) {
      currentOrigin = 'http://localhost:3333';
    }
    this.env.setConfig({ baseUrl: currentOrigin }, environments);
  }
}
