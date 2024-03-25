import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FormOptions, META} from '@next-levels/types';
import { FormController } from '../../lib/controller/form-controller';
import {ListController} from '../../../../list-builder';
import { InstanceRegistryService } from '@next-levels/next-framework-client';
import { ActivatedRoute } from '@angular/router';
import {TableDefaultComponent} from "../../../../list-builder/src/lib/components/table-default/table-default.component";

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


         const model = this.formField.options.model;
         // const rootModelName = META.getNameByModel(new model());
         const viewController = META.getViewControllerByName(model);

        tableSubmoduleComponentInstance.listController = new ListController(
          viewController,
          this.registry.retrieve(this.formField.options.model),
          viewController
        );
         tableSubmoduleComponentInstance.listController.setScope(
           this.formField.options.key,
           '$eq',
           Number(this.route.snapshot.paramMap.get('id'))
         );

      this.cdRef.detectChanges();

      console.log('tableSubmoduleComponentInstance', tableSubmoduleComponentInstance);
    }
  }
}
