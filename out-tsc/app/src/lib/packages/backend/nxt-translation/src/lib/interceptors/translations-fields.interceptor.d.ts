import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import 'reflect-metadata';
import { TranslationsService } from '../translations.service';
export declare class TranslationsInterceptor implements NestInterceptor {
    private readonly _translationsService;
    constructor(_translationsService: TranslationsService);
    processTranslation(item: any, lang: string, request: any): Promise<any>;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
