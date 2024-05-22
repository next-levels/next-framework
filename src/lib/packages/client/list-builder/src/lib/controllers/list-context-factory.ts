import {Injectable} from '@angular/core';
import {BaseFacadeType, DefaultGenerator, InstanceRegistryService,} from '@next-levels/next-framework-client';
import {ListContext} from './list-context';
import {ListController, META} from '@next-levels/types';
import {TranslateService} from '@ngx-translate/core';

/**
 * A factory service for creating `ListContext` instances.
 * This service is designed to abstract the complexity of creating `ListContext` instances,
 * which are essential for managing lists within the application. It utilizes the `InstanceRegistryService`
 * to retrieve or register instances of models and facades, and leverages the `TranslateService` for potential
 * internationalization support within the created `ListContext`.
 */
@Injectable({
  providedIn: 'root',
})
export class ListContextFactory {
  /**
   * Constructs a `ListContextFactory` instance.
   * @param registry The instance registry service used for retrieving or registering model and facade instances.
   * @param translateService The translation service used for internationalization within the `ListContext`.
   */
  constructor(
    private registry: InstanceRegistryService,
    public translateService: TranslateService
  ) {}

  /**
   * Creates a new `ListContext` instance.
   * This method attempts to construct a `ListContext` by resolving the model, facade, and controller
   * based on the provided arguments. It supports dynamic resolution of these components either by name or direct reference.
   * @param modelConstructorName The name of the model constructor or the constructor function itself.
   * @param variant An optional variant name used to resolve a specific `ListController`.
   * @returns A new instance of `ListContext` configured with the resolved model, facade, and controller.
   * @throws {Error} Throws an error if the arguments provided do not resolve to valid components.
   */
  create(
    modelConstructorName: string | any,
    variant?: string
  ): ListContext<any> {
    let model: { new (...args: any[]): any; new (...args: any[]): any };
    // Resolve the model either by name or by constructor reference.
    if (typeof modelConstructorName === 'string') {
      model = META.getModelByName(modelConstructorName);
    } else {
      model = new modelConstructorName();
    }

    // Attempt to retrieve an existing facade from the registry or resolve by name.
    let facade: BaseFacadeType | undefined;
    facade =
      this.registry.retrieve(model) ??
      this.registry.retrieve(modelConstructorName);

    // Resolve the controller based on the provided variant or model.
    let controller: ListController<any>;
    if (variant) {
      controller = META.getListControllerByName(variant);
    } else {
      controller =
        META.getListController(model) ??
        META.getListController(modelConstructorName);
    }

    // Fallback to a default controller if none is resolved.
    if (!controller) {
      const defaultGenerator = new DefaultGenerator<typeof model>();
      controller = new ListController(model, defaultGenerator);
    }

    //console.log(model, facade, controller);
    // Ensure all components are resolved before creating the ListContext.
    if (model && facade && controller) {
      return new ListContext(model, facade, controller, this.translateService);
    } else {
      throw new Error('Invalid arguments to create ListContext');
    }
  }
}
