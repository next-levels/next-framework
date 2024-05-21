export type Type = 'detail' | 'list';

export interface ActionType {
  type: Type;
  label: string;
  btnType?: string;
  icon: string;
  click: (model, facade) => void;
}
