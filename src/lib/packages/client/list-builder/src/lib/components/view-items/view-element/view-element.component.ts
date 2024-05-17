import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ListController } from '../../../controllers/ListController';
import {
  BUILDERFIELD_PREFIX,
  ListComponents,
  LISTFIELD_PREFIX,
  ListOptions,
  META,
} from '@next-levels/types';

@Component({
  selector: 'nxtlvls-view-element',
  templateUrl: './view-element.component.html',
  styleUrls: ['./view-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewElementComponent implements AfterViewInit, OnInit {
  @ViewChild('view', { read: ViewContainerRef }) view:
    | ViewContainerRef
    | undefined;

  @Input() fieldName: string;
  @Input() viewModel: any;
  @Input() viewObject: any;
  @Input() detailView = false;
  @Input() label = false;
  @Input() listController: ListController;

  viewModelInstance: any;
  listField: any;
  value: any;
  labelCode = '';

  constructor(
    private translateService: TranslateService,
    private cdRef: ChangeDetectorRef,
    @Inject('listBuilderComponents')
    private listBuilderComponents: ListComponents
  ) {}

  ngOnInit(): void {
    if (this.listController) {
      this.viewModel = this.listController.getModel();
      this.viewModelInstance = this.listController.getModelDefinition();
    } else {
      this.viewModelInstance = new this.viewModel();
    }

    this.translateService.get('test').subscribe((translated: string) => {
      const modelPrototype = this.viewModel.prototype
        ? this.viewModel.prototype
        : this.viewModel;

      this.labelCode =
        META.getNameByModel(modelPrototype) + '.properties.' + this.fieldName;

      if (this.label && this.labelCode) {
        this.listField = {
          label: this.translateService.instant(this.labelCode),
        };
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.fieldName) {
      if (this.viewObject) {
        let type: any = null;

        this.listField = this.getBuildField(this.fieldName);
        this.listField = {
          ...this.listField,
          ...this.getSettingsField(this.fieldName),
        };

        if (this.label && this.labelCode) {
          this.listField.label = this.translateService.instant(this.labelCode);
        }

        if (this.listBuilderComponents) {
          const component = this.listBuilderComponents[this.listField.type];
          if (component) {
            const componentRef = this.view.createComponent(component);
            this.initComponent(componentRef);
          } else {
            console.info(
              `No component found for type: ${this.listField.type}  Field: ${this.fieldName}`
            );
          }
        }
      }
    }
  }

  public getSettingsField(field: string): ListOptions {
    return Reflect.getMetadata(LISTFIELD_PREFIX, this.viewModelInstance, field);
  }

  public getBuildField(field: string): ListOptions {
    return Reflect.getMetadata(
      BUILDERFIELD_PREFIX,
      this.viewModelInstance,
      field
    );
  }

  initComponent(componentRef: any) {
    componentRef.instance.fieldName = this.fieldName;
    componentRef.instance.listField = this.listField;
    componentRef.instance.listController = this.listController;
    componentRef.instance.viewObject = this.viewObject;
    componentRef.instance.detailView = this.detailView;
    this.cdRef.detectChanges();
  }
}
