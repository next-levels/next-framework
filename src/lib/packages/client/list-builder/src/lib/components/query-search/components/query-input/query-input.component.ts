import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {
  KEY_BACK_SPACE,
  KEY_LEFT,
  KEY_RETURN,
  KEY_SPACE,
  KEY_TAB,
} from 'keycode-js';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { mapSelectedOptions } from '../../helpers/filter-mapping';
import { FieldResult } from '../../models/field-result';
import { SelectedOption } from '../../models/selected-option';
import {
  ApiResponse,
  ContentType,
  SelectionDict,
  SuggestionDetails,
} from '../../models/settings';
import { SaveQueryDialogComponent } from '../save-query-dialog/save-query-dialog.component';
import {
  BUILDERFIELD_ALL_PREFIX,
  BUILDERFIELD_PREFIX,
  META,
} from '@next-levels/types';
import { SearchQuery } from '../../models/search-queries.model';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'query-input',
  templateUrl: './query-input.component.html',
  styleUrls: ['./query-input.component.scss'],
})
export class QueryInputComponent implements OnInit, OnChanges {
  public myControl = new FormControl();
  public filteredOptions: Observable<string[]>;

  private searchFields: FieldResult[] = [];
  private fields: string[] = [];
  private fieldList: SuggestionDetails = {
    Name: ContentType.Field,
    Value: [],
    Valid: ['string'],
  };
  private operatorList: SuggestionDetails = {
    Name: ContentType.Operator,
    Value: ['=', '!=', '>', '<', 'beinhaltet'],
    Valid: ['string'],
  };
  private valueList: SuggestionDetails = {
    Name: ContentType.Value,
    Value: [],
    Valid: ['string'],
  };
  private expressionList: SuggestionDetails = {
    Name: ContentType.Expression,
    Value: ['AND', 'OR'],
    Valid: ['string'],
  };
  private operator: string[] = this.operatorList.Value;
  private value: string[] = this.valueList.Value;
  private expression: string[] = this.expressionList.Value;
  private defaultSelection: string = ContentType.Field;
  private currentEvent: string;
  private response: ApiResponse[] = [];
  private fieldResultMap = new Map();
  private editPosition = 0;
  private searchList: SelectedOption[] = [];

  public styleExpression = '';
  public isSubmittable = false;
  public isSuccessfullySubmitted = false;
  private isCurrentlyTypedIn = false;
  private isExpectingSpace = false;
  private restrictedEditMode = true;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private get field(): string[] {
    return this.fieldList.Value;
  }

  private get selectionList(): SelectionDict[] {
    return [
      {
        Name: ContentType.Field,
        Value: this.field,
        NextSelection: ContentType.Operator,
      },
      {
        Name: ContentType.Operator,
        Value: this.operator,
        NextSelection: ContentType.Value,
      },
      {
        Name: ContentType.Value,
        Value: this.value,
        NextSelection: ContentType.Expression,
      },
      {
        Name: ContentType.Expression,
        Value: this.expression,
        NextSelection: ContentType.Field,
      },
    ];
  }

  @Input() model: any;
  @Input() placeholder: string;
  @Input() style: any = {};
  @Input() user: any;
  @Input() searchQuery: SearchQuery;
  @Input() modelReference: string;

  @Output() queryChange: EventEmitter<any[]> = new EventEmitter();
  @Output() openQueryRowsModalEvent = new EventEmitter<any>();

  @ViewChild('typeahead', { read: MatAutocompleteTrigger })
  autoTrigger: MatAutocompleteTrigger;

  constructor(
    private readonly _modalService: NgbModal,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.fields = Reflect.getMetadata(BUILDERFIELD_ALL_PREFIX, this.model);
    this.translateService
      .get('test')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((translated: string) => {
        for (const field of this.fields) {
          const fieldResult = this.translateService.instant(
            META.getNameByModel(this.model) + '.properties.' + field
          );
          this.fieldResultMap.set(fieldResult, field);
          const searchObject: FieldResult = {
            DisplayName: fieldResult,
            SearchType: 'Value',
            AutoCompleteValues: [],
          };
          this.searchFields.push(searchObject);
          this.response.push(searchObject);
          this.fieldList.Value = this.response
            .filter((r) => r.SearchType == ContentType.Value)
            .map<string>((r) => r.DisplayName.toString());
        }
        this.myControl.setValue('');
      });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.filteredOptions
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((val) => {
        return val;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery']?.currentValue) {
      const searchQuery = changes['searchQuery'].currentValue;

      this.myControl.setValue('');
      this.searchList = JSON.parse(searchQuery.search_statement);
      this.emitFilter();
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  public openQueryRowsModal() {
    this.openQueryRowsModalEvent.emit();
  }

  public onClickEvent(event: any) {
    this.editPosition = event.target.selectionStart;
    const currentSearchListElement = this.checkPosition();
    if (currentSearchListElement) {
      if (
        this.restrictedEditMode &&
        (currentSearchListElement !==
          this.searchList[this.searchList.length - 1] ||
          currentSearchListElement.PopulatedFrom !== 'Value')
      ) {
        const len = event.target.value.length;
        event.target.setSelectionRange(len, len);
      }
      if (
        currentSearchListElement ===
          this.searchList[this.searchList.length - 1] &&
        currentSearchListElement.PopulatedFrom === 'Value' &&
        this.isSuccessfullySubmitted
      ) {
        this.searchList.pop();
      }
    }
  }

  public onKeypressEvent(event: any) {
    this.styleExpression = '';
    this.editPosition = event.target.selectionStart;
    if (
      (this.restrictedEditMode &&
        event.keyCode == KEY_LEFT &&
        this.checkPosition()) ||
      event.keyCode === KEY_RETURN ||
      event.keyCode === KEY_TAB
    ) {
      event.preventDefault();
    }
    if (event.keyCode !== KEY_RETURN) {
      this.isCurrentlyTypedIn = true;
    }
    if (
      this.currentEvent === 'Value' &&
      this.isCurrentlyTypedIn &&
      !this.isExpectingSpace &&
      !this.isSuccessfullySubmitted &&
      (event.keyCode === KEY_RETURN ||
        event.keyCode === KEY_TAB ||
        event.keyCode === KEY_SPACE)
    ) {
      this.submitFunction();
    } else if (event.keyCode === KEY_TAB && this.autoTrigger.activeOption) {
      this.myControl.setValue(
        this.myControl.value + this.autoTrigger.activeOption.value
      );
    }
    if (event.keyCode !== KEY_RETURN) {
      this.isSuccessfullySubmitted = false;
    }
    if (event.keyCode === KEY_SPACE) {
      this.isExpectingSpace = false;
    }
    if (
      this.restrictedEditMode &&
      event.keyCode !== KEY_SPACE &&
      event.keyCode !== KEY_BACK_SPACE &&
      this.isExpectingSpace
    ) {
      Swal.fire({
        text: 'An dieser Stelle wird ein Leerzeichen erwartet!',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Verstanden!',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }
    if (this.restrictedEditMode && event.target.value.indexOf('  ') !== -1) {
      Swal.fire({
        text: 'Bitte keine Leerzeichen aneinanderreihen!',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Verstanden!',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      }).then((r) => {
        if (r.isConfirmed) {
          event.target.value = event.target.value.replace('  ', ' ');
        }
      });
    }
  }

  public displayFn(value: string): string {
    if (
      this.searchList.length > 0 &&
      value.indexOf(this.searchList.map((s) => s.Value).join(' ')) !== -1
    ) {
      value = value.replace(
        this.searchList.map((s) => s.Value).join(' ') + ' ',
        ''
      );
    }
    if (value) {
      this.isCurrentlyTypedIn = false;
      this.searchListPush(value);
      setTimeout(() => {
        this.isExpectingSpace = true;
      }, 100);
      if (this.currentEvent === 'Value') {
        this.emitFilter();
      }
    }
    return this.searchList.length > 0
      ? this.searchList.map((s) => s.Value).join(' ')
      : '';
  }

  //
  // Private functions
  //

  private getOptionList(): string[] {
    if (
      this.searchList == null ||
      this.searchList == undefined ||
      this.searchList.length === 0
    ) {
      this.currentEvent = this.defaultSelection;

      return this.field;
    }

    const lastElement: SelectedOption = <SelectedOption>(
      this.searchList.slice(-1).pop()
    );
    const currentList = this.selectionList.find(
      (s) => s.Name.toLowerCase() === lastElement.Next.toLowerCase()
    );

    this.currentEvent = currentList ? currentList.Name : this.defaultSelection;

    return currentList ? this.getValues(currentList) : this.field;
  }

  private getValues(currentList: SelectionDict): string[] {
    if (this.currentEvent.toLowerCase() != 'value') return currentList.Value;

    const selectedField = this.getLastField();
    const selectedValue = selectedField ? selectedField.Value : '';
    const filteredResponse = this.response.find(
      (r) => r.DisplayName === selectedValue
    );

    return filteredResponse ? filteredResponse.AutoCompleteValues : [];
  }

  // ------------- Get Autocomplete List END --------------------

  // --------------- START : Get the search text based on which the autocomplete will populate --------
  private getSearchText(value: string): string {
    // let searchWord = '';

    // if (this.myControl.value) {
    //   let position = 0;
    //   const words = this.myControl.value.trim().split(' ');
    //   for (let i = 0; i < words.length; i++) {
    //     position += words[i].length;
    //     if (this.editPosition <= position) {
    //       searchWord = words[i];
    //       break;
    //     }
    //     position += 1;
    //   }
    // }

    this.handleBackspace(value);
    const oldText = this.searchList.map((s) => s.Value).join(' ');
    return value.replace(oldText, '');
  }

  private handleBackspace(searchValue: string): void {
    const oldText = this.searchList.map((s) => s.Value).join(' ');
    const previousListName =
      this.searchList.length != 0
        ? this.searchList[this.searchList.length - 1].PopulatedFrom
        : '';
    const prevList = this.selectionList.find(
      (s) => s.Name.toLowerCase() === previousListName.toLowerCase()
    );
    let prevListValue = prevList ? prevList.Value : [];
    if (previousListName == ContentType.Value) {
      const lastField = this.getLastField();
      const lastFieldValue = lastField ? lastField.Value : '';
      const filteredResponse = this.response.find(
        (r) => r.DisplayName === lastFieldValue
      );

      prevListValue = filteredResponse
        ? filteredResponse.AutoCompleteValues
        : [];
    }
    if (
      prevListValue.indexOf(searchValue) === -1 &&
      oldText.trim().length > searchValue.trim().length
    ) {
      this.searchList.pop();
    }
  }

  // --------------- END : Get the search text based on which the autocomplete will populate --------

  private getNextEvent(currentEvent: string): string {
    const currentList = this.selectionList.find(
      (s) => s.Name.toLowerCase() === currentEvent.toLowerCase()
    );

    return currentList ? currentList.NextSelection : this.defaultSelection;
  }

  private getLastField(): SelectedOption | undefined {
    if (this.searchList.length === 0) return undefined;
    let i: number = this.searchList.length - 1;
    for (i; i >= 0; i--) {
      if (this.searchList[i].PopulatedFrom == ContentType.Field)
        return this.searchList[i];
    }
    return undefined;
  }

  private _filter(value: string): string[] {
    const optionListToBePopulated: string[] = this.getOptionList();
    let searchText = this.getSearchText(value);
    let limitation = '';

    if (this.currentEvent === 'Value') {
      this.checkForSpaceInSearchText(searchText);
    }

    if (this.currentEvent === 'Field') {
      if (
        this.searchList.length >= 4 &&
        this.searchList[this.searchList.length - 1].Value === 'OR'
      ) {
        limitation = this.searchList[this.searchList.length - 4].Value;
      }
    }
    const options = optionListToBePopulated.filter(
      (option) =>
        option.toLowerCase().indexOf(searchText.toLowerCase().trim()) !== -1 &&
        (limitation === '' || limitation === option) // Findet "Status" in "Aktueller Status"
    );
    if (
      searchText.charAt(searchText.length - 1) === ' ' &&
      options.includes(searchText.trim())
    ) {
      this.displayFn(searchText.trim());
    }
    if (
      this.isCurrentlyTypedIn &&
      optionListToBePopulated.length > 0 &&
      options.length === 0
    ) {

      const result = [];
      result.push({
        key: 'id',
        operation: '$eq',
        value: value,
        expression: '$or',
      })

      result.push({
        key: 'name',
        operation: '$eq',
        value: value,
        expression: '$or',
      })

      this.queryChange.emit(result);

    }

    return options;
  }

  private emitFilter() {
    this.validitySupervisor();
    if (!this.isSubmittable) {
      this.styleExpression = 'border: 1px solid red;';
      Swal.fire({
        text: 'Aus dieser Eingabe kann keine gültige Suchanfrage erstellt werden.',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Verstanden!',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      }).then((r) => r);
    } else {
      this.isSuccessfullySubmitted = true;
      document.getElementById('focussableButton')?.focus();
      const selectedOptions = JSON.parse(JSON.stringify(this.searchList)); // deep copy
      selectedOptions.forEach(
        (selectedOption: SelectedOption, index: number) => {
          if (selectedOption.PopulatedFrom === 'Field') {
            let relatedField = this._getRelatedField(selectedOption.Value);

            if (relatedField) {
              // const listFields = Reflect.getMetadata(
              //   LISTFIELD_ALL_PREFIX,
              //   this.model
              // );
              // if (
              //   // experimental filtering of relations
              //   typeof this.model.relations === 'function' &&
              //   this.model.relations(relatedField).fields.length > 0 &&
              //   listFields.includes(relatedField.replace('_id', ''))
              // ) {
              //   const newArray = this.model
              //     .relations(relatedField)
              //     .fields.filter((item: string) => item !== 'id');
              //   relatedField = relatedField.replace('_id', '') + '.' + newArray[0];
              // }

              selectedOptions[index].Value = relatedField;
            }
          }
        }
      );
      this.queryChange.emit(mapSelectedOptions(selectedOptions));
    }
  }

  private _getRelatedField(fieldValue: string) {
    const targetFieldResult = fieldValue;

    return this.fieldResultMap.get(targetFieldResult);
  }

  private searchListPush(value: string) {
    if (this.currentEvent === 'Field') {
      this._setFieldValueOptions(value);
    }

    this.searchList.push(
      new SelectedOption(
        value,
        this.currentEvent,
        this.getNextEvent(this.currentEvent)
      )
    );
  }

  private _setFieldValueOptions(field: string) {
    const relatedField = this._getRelatedField(field);
    let dropdownValues = [];

    if (typeof this.model['dropdowns'] === 'function') {
      dropdownValues = this.model.dropdowns(relatedField);
    }

    if (dropdownValues.length > 0) {
      const mappedValues = dropdownValues.map((item: any) => item.value);

      this.response = this.response.map((r) => {
        if (r.DisplayName === field) {
          r.AutoCompleteValues = mappedValues;
        }
        return r;
      });
    }
  }

  private checkForSpaceInSearchText(searchText: string): void {
    if (
      searchText.trimStart().length &&
      searchText.trimStart().indexOf(' ') === searchText.trimStart().length - 1
    ) {
      this.searchListPush(searchText.trim());
    }
  }

  private checkPosition() {
    let position = 0;
    for (let i = 0; i < this.searchList.length; i++) {
      position += this.searchList[i].Value.length;

      if (this.editPosition <= position) {
        return this.searchList[i];
      }
      position += 1;
    }
    return undefined;
  }

  public addSearchQuery() {
    if (this.user && this.myControl.value) {
      const modalRef = this._modalService.open(SaveQueryDialogComponent, {
        ariaLabelledBy: 'modal-basic-title',
        modalDialogClass: 'modal-dialog-centered',
      });
      modalRef.componentInstance.searchQuery = {
        search_statement: JSON.stringify(this.searchList),
        input_string: this.myControl.value,
        user: this.user,
        model_reference: this.modelReference,
      };
    }
  }

  public emptyQuery() {
    this.searchList = [];
    this.myControl.setValue('');
    this.emitFilter();
  }

  public submitFunction() {
    if (this.isCurrentlyTypedIn && !this.isSuccessfullySubmitted) {
      this.searchListPush(this.getSearchText(this.myControl.value).trim());
    }
    // this.styleExpression = this.getColor();
    this.emitFilter();
  }

  private validitySupervisor() {
    this.isSubmittable =
      this.searchList.length === 0 || this.searchList.length % 4 === 3
        ? true
        : false;
  }

  private getColor() {
    let styleString = 'background-image: linear-gradient(90deg,';
    const max = 50;
    let count = 1;

    this.myControl.value.split(' ').forEach(function (value: string) {
      const part = (value.length / max) * 100;

      switch (count) {
        case 1:
          styleString +=
            'rgba(0,117,166,1) ' +
            part +
            '%, rgba(159,3,3,0) ' +
            part +
            '%, rgba(159,3,3,1) ' +
            part +
            '%,';
          break;
        case 2:
          styleString +=
            'rgba(144,8,15,1) ' +
            part +
            '%, rgba(144,8,15,0) ' +
            part +
            '%, rgba(144,8,15,1) ' +
            part +
            '%,';
          break;
        case 3:
          styleString +=
            'rgba(21,45,109,1) ' +
            part +
            '%, rgba(21,45,109,0) ' +
            part +
            '%, rgba(21,45,109,1) ' +
            part +
            '%,';
          break;
      }
      count++;
    });
    styleString = styleString.slice(0, -1);
    styleString += ')';
    return styleString;
  }
}
