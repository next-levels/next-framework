import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import 'reflect-metadata';
import { TranslationsService } from '../translations.service';
import { TRANSLATABLE_FIELDS_METADATA_KEY } from '../decoretors/translatable-fields.decorator';
import { findNearestEntity } from '../translations.helper';
import { translatableEntities } from '../translatable-entities';

@Injectable()
export class TranslationsUpdateInterceptor implements NestInterceptor {
  constructor(private readonly _translationsService: TranslationsService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { headers, body, method, params } = request;

    if (method !== 'PUT' && method !== 'PATCH') {
      return next.handle();
    }

    const lang = headers['nxt-model-lang'];
    const defaultLang = 'de';

    if (!lang || lang === defaultLang) {
      return next.handle();
    }

    const url = request.url;
    const target = findNearestEntity(url, translatableEntities);
    const translatableFields = Reflect.getMetadata(
      TRANSLATABLE_FIELDS_METADATA_KEY,
      target
    );

    if (!translatableFields) {
      return next.handle();
    }

    const modelId = parseInt(params.id, 10);
    const modelType = target.name;
    let translation = {};

    for (const field of translatableFields) {
      if (body[field]) {
        translation[field] = body[field];
        delete body[field];
      }
    }

    if (Object.keys(translation).length > 0) {
      translation = JSON.stringify(translation);
      await this._translationsService.addTranslation(
        lang,
        modelType,
        modelId,
        translation
      );
    }

    return next.handle();
  }
}
