import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormOptions } from '@next-levels/types';
import { FormController } from '../../lib/controller/form-controller';
import { TableSubmoduleComponent } from '../../../../list-builder/src/lib/components/table-submodule/table-submodule.component';
import { ListController } from '../../../../list-builder';
import { InstanceRegistryService } from '@next-levels/next-framework-client';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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
          TableSubmoduleComponent
        );
      const componentRef = this.container.createComponent(componentFactory);

      const tableSubmoduleComponentInstance =
        componentRef.instance as TableSubmoduleComponent;

      //   tableSubmoduleComponentInstance.listController = new ListController(
      //     new this.formField.options.model(),
      //     this.registry.retrieve(this.formField.options.model),
      //     new this.formField.options.model()
      //   );
      //   tableSubmoduleComponentInstance.listController.setScope(
      //     this.formField.options.key,
      //     '$eq',
      //     Number(this.route.snapshot.paramMap.get('id'))
      //   );
    }
  }
}
