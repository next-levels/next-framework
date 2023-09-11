import { BasicFacade, NotificationTypeFacade } from '@nxtlvls/generic-store';
import { Observable } from "rxjs";

export interface BaseFacadeType {
  base: BasicFacade<any>;
  notification: NotificationTypeFacade<any>;
  selectors: Record<string, (arg: any) => Observable<any>>;
}
