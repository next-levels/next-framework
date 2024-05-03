import { Injectable } from '@angular/core';
import { EnvironmentStorageService } from './environment-storage/environment-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private envConfig: any;

  constructor(private env: EnvironmentStorageService) {}

  loadConfig(environments: any[]) {
    const currentOrigin = window.location.origin;
    this.env.setConfig({ baseUrl: currentOrigin }, environments);
  }

  get environmentName(): string {
    return this.envConfig ? this.envConfig.name : 'local';
  }
}
