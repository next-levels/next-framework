import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of, switchMap } from 'rxjs';
import 'reflect-metadata';
import { TranslationsService } from '../translations.service';
import { TRANSLATABLE_FIELDS_METADATA_KEY } from '../decoretors/translatable-fields.decorator';
import { translatableEntities } from '../translatable-entities';
import { findNearestEntity } from '../translations.helper';
import {Result} from "../../../../nest-tools";

@Injectable()
export class TranslationsInterceptor implements NestInterceptor {
  constructor(private readonly _translationsService: TranslationsService) {}

  async processTranslation(item, lang: string, request: any) {
    const model_type = item.constructor.name;
    const model_id = item.id;
    let translations = await this._translationsService.getTranslations(
      model_type,
      model_id,
      lang
    );

    const url = request.url;
    const target = findNearestEntity(url, translatableEntities);
    const translatableFields = Reflect.getMetadata(
      TRANSLATABLE_FIELDS_METADATA_KEY,
      target
    );

    if (!translatableFields) {
      return item;
    }

    if (translations) {
      translations = JSON.parse(translations);
      Object.assign(item, translations);
    }

    return item;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      switchMap(async (data) => {
        const request = context.switchToHttp().getRequest();

        const lang = request.headers['nxt-model-lang'];
        if (!lang || !data || lang === 'de') {
          return data;
        }

        const requestData = data.getValue();

        if (Array.isArray(data)) {
          return Result.ok(
            await Promise.all(
              data.map((item) => this.processTranslation(item, lang, request))
            )
          );
        } else if (requestData.data && Array.isArray(requestData.data)) {
          requestData.data = await Promise.all(
            requestData.data.map((item) =>
              this.processTranslation(item, lang, request)
            )
          );

          return Result.ok(requestData);
        } else {
          return Result.ok(
            await this.processTranslation(requestData, lang, request)
          );
        }
      })
    );
  }
}
