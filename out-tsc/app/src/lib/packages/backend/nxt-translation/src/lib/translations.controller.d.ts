import 'reflect-metadata';
import { TranslationsService } from './translations.service';
import { UpdateTranslationDto } from './dtos/translation.dto';
import { TranslationEntity } from './entities/translation.entity';
import { Result } from '../../../nest-tools/src/lib/return/result';
export declare class TranslationsController {
    private readonly _translationsService;
    constructor(_translationsService: TranslationsService);
    create(dto: Partial<UpdateTranslationDto>): Promise<Result<Promise<TranslationEntity>>>;
}
