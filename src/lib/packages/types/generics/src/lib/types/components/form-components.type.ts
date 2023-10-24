import { BaseComponents } from './base-components.type';

export interface FormComponents extends BaseComponents {}

export type FormComponentKeys = keyof FormComponents;

export let ft: FormComponents = {};
