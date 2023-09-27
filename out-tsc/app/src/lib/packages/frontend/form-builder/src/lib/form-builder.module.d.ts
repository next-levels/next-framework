import { ModuleWithProviders } from '@angular/core';
import { FormComponents } from '../../../../shared/generics/src';
export interface FormBuilderConfig {
    environment: string;
}
export declare class FormBuilderModule {
    static forRoot(components: FormComponents, baseUrl: string): ModuleWithProviders<FormBuilderModule>;
}
