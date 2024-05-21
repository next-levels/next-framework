import 'reflect-metadata';
import { Connection, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TranslationEntity } from './entities/translation.entity';
import { UpdateTranslationDto } from './dtos/translation.dto';
import { Result } from '../../../nest-tools/src/lib/return/result';
import { LanguagesEntity } from './entities/languages.entity';

@Injectable()
export class TranslationsService {
  public readonly entitiesWithFileFields: Map<string, any>;

  constructor(
    @InjectRepository(TranslationEntity)
    private readonly _translationsRepository: Repository<TranslationEntity>,
    @InjectRepository(LanguagesEntity)
    private readonly _langsRepository: Repository<LanguagesEntity>,
    private readonly _httpService: HttpService,
    private readonly connection: Connection
  ) {}

  /**
   * Find local file by id
   *
   * @param id
   * @returns
   */
  public async findOne(
    model_type: string,
    model_id: string,
    lang_id: string
  ): Promise<TranslationEntity | null> {
    return await this._translationsRepository.findOneBy({
      model_type,
      model_id,
      lang_id,
    });
  }

  /**
   * Find local file by id
   *
   * @returns
   * @param model_type
   * @param model_id
   * @param model_field
   */
  public async findField(
    model_type: string,
    model_id: string,
    model_field: string
  ): Promise<{ lang_id: string; value: any }[]> {
    const translations: TranslationEntity[] =
      await this._translationsRepository.findBy({
        model_type,
        model_id,
      });

    const result = translations.map((translation) => {
      let value: null;
      try {
        const content = JSON.parse(translation.content);
        value = content[model_field];
      } catch (e) {
        value = null;
      }
      return {
        lang_id: translation.lang_id,
        value: value,
      };
    });

    return result;
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
    dto: UpdateTranslationDto[],
    model_field: string
  ): Promise<Result<TranslationEntity[]>> {
    try {
      const translationPromises = dto.map(async (item) => {
        const translation = await this._translationsRepository.findOne({
          where: {
            model_type: item.model_type,
            model_id: item.model_id,
            lang_id: item.lang_id,
          },
        });

        if (translation) {
          let existingContent = {};
          if (translation.content) {
            existingContent = JSON.parse(translation.content);
          }
          if (item.content) {
            existingContent[model_field] = item.content;
            translation.content = JSON.stringify(existingContent);

            return this._translationsRepository.save(translation);
          }
        }

        const newTranslation = new TranslationEntity();
        newTranslation.model_type = item.model_type;
        newTranslation.model_id = item.model_id;
        newTranslation.lang_id = item.lang_id;

        if (item.content) {
          newTranslation.content = JSON.stringify({
            [model_field]: item.content,
          });

          return this._translationsRepository.save(newTranslation);
        }
      });

      const savedTranslations = await Promise.all(translationPromises);
      return Result.ok(savedTranslations);
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return Result.fail({
        message: errorMessage,
        httpCode: 500,
        changeHttpCode: true,
      });
    }
  }

  async addTranslation(
    lang_id: string,
    model_type: string,
    model_id: string,
    content: any
  ): Promise<any> {
    const existingTranslation = await this._translationsRepository.findOne({
      where: { model_type, model_id, lang_id },
    });

    if (existingTranslation) {
      existingTranslation.content = content;
      return this._translationsRepository.save(existingTranslation);
    } else {
      const newTranslation = this._translationsRepository.create({
        lang_id,
        model_type,
        model_id,
        content,
      });
      return this._translationsRepository.save(newTranslation);
    }
  }

  async getTranslations(
    model_type: string,
    model_id: string,
    lang_id: string
  ): Promise<string> {
    const translation = await this._translationsRepository.findOne({
      where: { model_type, model_id, lang_id },
    });

    return translation ? translation.content : '';
  }

  async getLangs(): Promise<LanguagesEntity[]> {
    return await this._langsRepository.find();
  }
}
