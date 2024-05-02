export type Type = 'detail' | 'list';

export interface ActionType {
    type: Type;
    label: string;
    icon: string;
    click: (model, facade) => void
}