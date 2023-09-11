import { NgModule, ModuleWithProviders, Type, InjectionToken, Inject, forwardRef } from "@angular/core";

@NgModule({})
export class RootStoreModule {
  static forRoot(backendOrFrontend: 'backend' | 'frontend'): ModuleWithProviders<RootStoreModule> {
    return {
      ngModule: RootStoreModule,
      providers: [
        { provide: 'backendOrFrontend', useValue: backendOrFrontend }
      ]
    };
  }

}
