import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentStorageService {
  private static instance: EnvironmentStorageService;
  public baseUrl = '';
  public baseSocket = '';

  public environments: any[];
  private currentEnvironment: any;

  private constructor() {}

  public static getInstance(): EnvironmentStorageService {
    if (!EnvironmentStorageService.instance) {
      EnvironmentStorageService.instance = new EnvironmentStorageService();
    }
    return EnvironmentStorageService.instance;
  }

  setConfig(config: { baseUrl: string }, environments: any[]): void {
    this.baseSocket = config.baseUrl;
    this.environments = environments;
    this.currentEnvironment = this.environments.find(
      (env) => env.baseUrl === config.baseUrl
    );
  }

  setEnvionments(environments: any[]): void {
    this.environments = environments;
  }

  getCurrentEnvironment() {
    return this.currentEnvironment;
  }
}
