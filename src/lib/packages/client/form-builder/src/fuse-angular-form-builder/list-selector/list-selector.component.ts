import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormOptions, META } from '@next-levels/types';
import { FormController } from '../../lib/controller/form-controller';
import { ListController } from '../../../../list-builder';
import { InstanceRegistryService } from '@next-levels/next-framework-client';
import { ActivatedRoute } from '@angular/router';
import { TableDefaultComponent } from '../../../../list-builder/src/lib/components/table-default/table-default.component';

@Component({
  selector: 'nxt-list-selector',
  templateUrl: './list-selector.component.html',
})
export class ListSelectorComponent implements OnInit, AfterViewInit {
  @ViewChild('tableSubmoduleComponentContainer', { read: ViewContainerRef })
  container: ViewContainerRef | undefined;

  @Input() formField: FormOptions;
  @Input() formController: FormController | undefined;
  protected fg: FormGroup | undefined;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private registry: InstanceRegistryService,
    private route: ActivatedRoute,
    public cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.formField && this.formField.name && this.formController) {
      this.fg = this.formController?.getForm();
    }
  }

  ngAfterViewInit() {
    if (this.container !== undefined && this.formField.options) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(
          TableDefaultComponent
        );
      const componentRef = this.container.createComponent(componentFactory);
      const tableSubmoduleComponentInstance =
        componentRef.instance as TableDefaultComponent;

      const model = this.formController.getModelDefinition();
      const propertyType = Reflect.getMetadata(
        'design:type',
        model,
        this.formField?.name
      );

      let viewController = null;
      let targetModel = null;

      if (propertyType !== Array) {
        targetModel = propertyType;
      } else if (this.formField.options.model) {
        targetModel = META.getModelByName(this.formField.options.model);
      }

      if (!this.formField.options.view) {
        viewController = META.getListControllerByName(
          META.getNameByModel(targetModel)
        );
      } else {
        viewController = META.getListControllerByName(
          this.formField.options.view
        );
      }

      tableSubmoduleComponentInstance.listController = new ListController(
        targetModel,
        this.registry.retrieve(targetModel.constructor),
        targetModel
      );

      if (viewController) {
        tableSubmoduleComponentInstance.childTable = true;
        tableSubmoduleComponentInstance.viewController = viewController;

        if (this.formField.options.fromParent) {
          let entities: any[] = [];

          let data = this.formController?.getModel();

          if (this.formField.options.selector) {
            entities = data[this.formField.options.selector];
          } else {
            entities = data[this.formField.name];
          }

          tableSubmoduleComponentInstance.fetchData = false;
          tableSubmoduleComponentInstance.entities = entities;
        }
        if (this.formField.options.keySelf && this.formController?.getModel()) {
          tableSubmoduleComponentInstance.listController.setScope(
            this.formField.options.key,
            '$eq',
            this.formController?.getModel()[this.formField.options.keySelf]
          );
        } else {
          tableSubmoduleComponentInstance.listController.setScope(
            this.formField.options.key,
            '$eq',
            Number(this.route.snapshot.paramMap.get('id'))
          );
        }

        this.cdRef.detectChanges();
      }
    }
  }
}
