import 'reflect-metadata';
import { Connection, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TranslationEntity } from './entities/translation.entity';
import { TRANSLATE_FIELD_METADATA_KEY } from './decoretors/translatable-fields.decorator';
import { UpdateTranslationDto } from './dtos/translation.dto';
import { Result } from '../../../nest-tools/src/lib/return/result';

@Injectable()
export class TranslationsService {
  public readonly entitiesWithFileFields: Map<string, any>;

  constructor(
    @InjectRepository(TranslationEntity)
    private readonly _translationsRepository: Repository<TranslationEntity>,
    private readonly _httpService: HttpService,
    private readonly connection: Connection
  ) {}

  /**
   * Find local file by id
   *
   * @param id
   * @returns
   */
  public async findOne(id: number): Promise<TranslationEntity | null> {
    return await this._translationsRepository.findOneBy({ id: id });
  }

  /**
   * Find all local files
   *
   * @returns
   */
  public async findAll(): Promise<TranslationEntity[]> {
    return await this._translationsRepository.find();
  }

  async createOrUpdate(
    dto: UpdateTranslationDto
  ): Promise<Result<Promise<TranslationEntity>>> {
    const attachmentObject = this.entitiesWithFileFields.get(dto.model_type);
    if (!attachmentObject) {
      throw new Error(`Entity not found for attachmentType: ${dto.model_type}`);
    }

    const fileFields =
      Reflect.getMetadata(
        TRANSLATE_FIELD_METADATA_KEY,
        attachmentObject.prototype
      ) || [];

    const newTranslation = new TranslationEntity();
    newTranslation.model_type = dto.model_type;
    newTranslation.model_id = dto.model_id;
    newTranslation.lang = dto.lang;
    newTranslation.content = dto.content;

    return Result.ok(this._translationsRepository.save(newTranslation));
  }

  async addTranslation(
    lang: string,
    model_type: string,
    model_id: number,
    content: any
  ): Promise<any> {
    const existingTranslation = await this._translationsRepository.findOne({
      where: { model_type, model_id, lang },
    });

    if (existingTranslation) {
      existingTranslation.content = content;
      return this._translationsRepository.save(existingTranslation);
    } else {
      const newTranslation = this._translationsRepository.create({
        lang,
        model_type,
        model_id,
        content,
      });
      return this._translationsRepository.save(newTranslation);
    }
  }

  async getTranslations(
    model_type: string,
    model_id: number,
    lang: string
  ): Promise<string> {
    const translation = await this._translationsRepository.findOne({
      where: { model_type, model_id, lang },
    });

    return translation ? translation.content : '';
  }
}
