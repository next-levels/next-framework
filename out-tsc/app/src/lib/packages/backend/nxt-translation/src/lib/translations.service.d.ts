import 'reflect-metadata';
import { Connection, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { TranslationEntity } from './entities/translation.entity';
import { UpdateTranslationDto } from './dtos/translation.dto';
import { Result } from '../../../nest-tools/src/lib/return/result';
export declare class TranslationsService {
    private readonly _translationsRepository;
    private readonly _httpService;
    private readonly connection;
    readonly entitiesWithFileFields: Map<string, any>;
    constructor(_translationsRepository: Repository<TranslationEntity>, _httpService: HttpService, connection: Connection);
    /**
     * Find local file by id
     *
     * @param id
     * @returns
     */
    findOne(id: number): Promise<TranslationEntity | null>;
    /**
     * Find all local files
     *
     * @returns
     */
    findAll(): Promise<TranslationEntity[]>;
    createOrUpdate(dto: UpdateTranslationDto): Promise<Result<Promise<TranslationEntity>>>;
    addTranslation(lang: string, model_type: string, model_id: number, content: any): Promise<any>;
    getTranslations(model_type: string, model_id: number, lang: string): Promise<string>;
}
