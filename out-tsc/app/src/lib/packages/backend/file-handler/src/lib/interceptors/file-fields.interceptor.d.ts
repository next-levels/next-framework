import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import 'reflect-metadata';
import { Observable } from 'rxjs';
import { FilesService } from '../files.service';
export declare class FileInjectInterceptor implements NestInterceptor {
    private readonly filesService;
    constructor(filesService: FilesService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private processFileFields;
}
