import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import {BaseViewComponent} from "./components/view-items/base-view.component";
import {ViewTextComponent} from "./components/view-items/view-text.component";
import {defaultPageComponents} from "./types/default-page-components.type";
import {BasePageComponents} from "./types/base-components.model";
import {BasePageComponent} from "./components/base-page/base-page.component";
import {ViewBoxComponent} from "./components/view-items/view-box.component";
import {ViewButtonComponent} from "./components/view-items/view-button.component";
import {ViewImageComponent} from "./components/view-items/view-image.component";

@NgModule({
  imports: [
    CommonModule,
   ],
  providers: [DatePipe],
  declarations: [
    BaseViewComponent,
    ViewTextComponent,
    BasePageComponent,
    ViewBoxComponent,
    ViewButtonComponent,
    ViewImageComponent
  ],
  exports: [
    BaseViewComponent,
    ViewTextComponent,
    BasePageComponent,
    ViewBoxComponent,
    ViewButtonComponent,
    ViewImageComponent
  ],
})
export class PageBuilderModule {
  static forRoot(
    components: BasePageComponents = defaultPageComponents
  ): ModuleWithProviders<PageBuilderModule> {
    return {
      ngModule: PageBuilderModule,
      providers: [
        { provide: 'pageBuilderComponents', useValue: components },
         {
          provide: 'pageBuilderComponents',
          useFactory: () => defaultPageComponents,
          deps: [],
        },
      ],
    };
  }
}
