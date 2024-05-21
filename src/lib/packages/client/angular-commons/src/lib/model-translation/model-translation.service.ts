import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentStorageService } from '../environment-storage/environment-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ModelTranslationService {
  public langs: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  defaultLang = 'de';

  constructor(
    private _httpClient: HttpClient,
    private environment: EnvironmentStorageService
  ) {
    this._modelLang.next(this.modelLang);
  }

  public _modelLang: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  get modelLang(): string {
    return localStorage.getItem('modelLang') ?? this.defaultLang;
  }

  /**
   * Setter & getter for access token
   */
  set modelLang(modelLang: string) {
    localStorage.setItem('modelLang', modelLang);
    this._modelLang.next(modelLang);
  }

  get(): Observable<any[]> {
    const apiUrl = this.environment.baseUrl + '/api/translations/langs';

    return this._httpClient.get<any[]>(apiUrl).pipe(
      tap((langs) => {
        this.langs.next(langs);
      })
    );
  }

  getField(model: string, id: number, field: string): Observable<any[]> {
    const apiUrl =
      this.environment.baseUrl +
      '/api/translations/field/' +
      model +
      '/' +
      id +
      '/' +
      field;

    return this._httpClient.get<any[]>(apiUrl);
  }

  getAutomaticTranslation(langs, source_iso, data): Observable<any[]> {
    const apiUrl = this.environment.baseUrl + '/api/shop/deepltranslation';

    return this._httpClient.post<any[]>(apiUrl, {
      langs,
      source_iso,
      values: data,
    });
  }

  updateTranslations(
    translations: any[],
    model_field: string
  ): Observable<any[]> {
    const apiUrl = this.environment.baseUrl + '/api/translations/update';

    return this._httpClient.post<any[]>(apiUrl, {
      dto: translations,
      model_field: model_field,
    });
  }
}
