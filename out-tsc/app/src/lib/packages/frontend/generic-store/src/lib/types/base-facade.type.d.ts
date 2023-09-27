import { Observable } from 'rxjs';
import { BasicFacade } from './base.type';
import { NotificationTypeFacade } from '../+store-types/notifcation/notification.facede';
export interface BaseFacadeType {
    base: BasicFacade<any>;
    notification: NotificationTypeFacade<any>;
    selectors: Record<string, (arg: any) => Observable<any>>;
}
