import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BUILDERFIELD_PREFIX,
  ListComponents,
  LISTFIELD_PREFIX,
  ListOptions,
  META,
} from '@nxtlvls/generic-types';
import { ListController } from '@nxtlvls/list-builder';

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
  @Input() listController: ListController;

  listField: any;
  value: any;

  constructor(
    private translateService: TranslateService,
    private cdRef: ChangeDetectorRef,
    @Inject('listBuilderComponents')
    private listBuilderComponents: ListComponents
  ) {}

  ngOnInit(): void {
    this.translateService.get('test').subscribe((translated: string) => {
      const labelCode =
        META.getNameByModel(this.listController.getModelDefinition()) +
        '.properties.' +
        this.fieldName;
      this.listField = {
        label: this.translateService.instant(labelCode),
      };
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

        const labelCode =
          META.getNameByModel(this.listController.getModelDefinition()) +
          '.properties.' +
          this.fieldName;
        this.listField.label = this.translateService.instant(labelCode);

        if (this.listBuilderComponents) {
          const component = this.listBuilderComponents[this.listField.type];
          if (component) {
            const componentRef = this.view.createComponent(component);
            this.initComponent(componentRef);
          } else {
            console.info(`No component found for type: ${this.listField.type}`);
          }
        }
      }
    }
  }

  public getSettingsField(field: string): ListOptions {
    return Reflect.getMetadata(
      LISTFIELD_PREFIX,
      this.listController.getModelDefinition(),
      field
    );
  }

  public getBuildField(field: string): ListOptions {
    return Reflect.getMetadata(
      BUILDERFIELD_PREFIX,
      this.listController.getModelDefinition(),
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
