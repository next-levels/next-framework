import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import 'reflect-metadata';
import { TranslationsService } from '../translations.service';
export declare class TranslationsUpdateInterceptor implements NestInterceptor {
    private readonly _translationsService;
    constructor(_translationsService: TranslationsService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
