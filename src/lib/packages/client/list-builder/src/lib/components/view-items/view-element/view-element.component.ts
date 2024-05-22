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
import { ListComponents } from '@next-levels/types';
import { ListContext } from '../../../controllers/list-context';

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
  @Input() context: ListContext<any>;

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
    if (this.context) {
      this.viewModel = this.context.model;
      this.viewModelInstance = this.context.model;
    } else {
      this.viewModelInstance = new this.viewModel();
    }
  }

  ngAfterViewInit(): void {
    if (this.fieldName && this.context) {
      if (this.viewObject) {
        let type: any = null;
        this.listField = this.context.getField(this.fieldName);
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

  initComponent(componentRef: any) {
    componentRef.instance.fieldName = this.fieldName;
    componentRef.instance.listField = this.listField;
    componentRef.instance.listController = this.context;
    componentRef.instance.viewObject = this.viewObject;
    componentRef.instance.detailView = this.detailView;
    this.cdRef.detectChanges();
  }
}
