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
import { FormOptions } from '@next-levels/types';
import { FormController } from '../../lib/controller/form-controller';
import { ActivatedRoute } from '@angular/router';
import { TableDefaultComponent } from '../../../../list-builder/src/lib/components/table-default/table-default.component';
import { ListContextFactory } from '../../../../list-builder/src/lib/controllers/list-context-factory';

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
    private route: ActivatedRoute,
    public cdRef: ChangeDetectorRef,
    private factory: ListContextFactory
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

      const definition = this.formController.getModelDefinition();
      const propertyType = Reflect.getMetadata(
        'design:type',
        definition,
        this.formField?.name
      );

      let model = null;
      if (propertyType !== Array) {
        model = propertyType;
      } else if (this.formField.options.model) {
        model = this.formField.options.model;
      }
      if (!model) {
        throw new Error(
          'Model not found. Please provide a model in the formField options'
        );
      }

      const view = this.formField?.options?.view || null;

      const listContext = this.factory.create(model, view);

      if (this.formField.options.fromParent) {
        listContext.fetch(false);
        const selector = this.formField.options.selector || this.formField.name;
        const entities = this.formController?.getModel()[selector] || [];
        tableSubmoduleComponentInstance.entities = entities;
      }

      tableSubmoduleComponentInstance.childTable = true;
      tableSubmoduleComponentInstance.context = listContext;
      this.cdRef.detectChanges();
    }
  }
}
