import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ModelTranslationInterceptor } from './model-translation.interceptor';
import { ModelTranslationService } from './model-translation.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ModelTranslationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ModelTranslationInterceptor,
      multi: true,
    },
  ],
})
export class ModelTranslationModule {}
