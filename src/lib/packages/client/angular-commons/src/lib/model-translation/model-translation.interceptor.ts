import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ModelTranslationService } from './model-translation.service';

@Injectable()
export class ModelTranslationInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(private _modelTranslationService: ModelTranslationService) {}

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request object
    let newReq = req.clone();

    if (this._modelTranslationService.modelLang) {
      newReq = req.clone({
        headers: req.headers.set(
          'nxt-model-lang',
          this._modelTranslationService.modelLang
        ),
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
