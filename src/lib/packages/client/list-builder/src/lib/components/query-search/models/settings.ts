export interface i_ModelSearchSettings {
  field: string;
  label: string;
}

export class SuggestionDetails {
  public Name: string;
  public Valid: string[];
  public Value: string[];
}

export class SelectionDict {
  public Name: string;
  public Value: string[];
  public NextSelection: string;
}

// Server response
export class ApiResponse {
  public DisplayName: string;
  public SearchType: string;
  public AutoCompleteValues: string[];
}

export enum ContentType {
  Field = 'Field',
  Operator = 'Operator',
  Value = 'Value',
  Expression = 'Expression',
}
