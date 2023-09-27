import { BasicFacade } from '../types/base.type';
export declare class FacadeRegistry {
    static facades: Record<string, BasicFacade<any>>;
    static registerFacade(name: string, facade: BasicFacade<any>): void;
    static getFacade(name: string): BasicFacade<any> | undefined;
}
