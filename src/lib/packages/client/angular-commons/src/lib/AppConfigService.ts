import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvironmentStorageService } from './environment-storage/environment-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private envConfig: any;

  constructor(
    private http: HttpClient,
    private env: EnvironmentStorageService,
    private router: Router
  ) {}

  loadConfig(environments: any[]) {
    const currentOrigin = window.location.origin;
    const matchingEnv =
      environments.find((env) => currentOrigin.startsWith(env.frontUrl)) ||
      environments.find((env) => env.name === 'local'); // Default to 'local'

    this.envConfig = matchingEnv;
    this.env.setConfig(matchingEnv, environments);
  }

  get environmentName(): string {
    return this.envConfig ? this.envConfig.name : 'local'; // Provide a default if no environment config is set
  }
}
