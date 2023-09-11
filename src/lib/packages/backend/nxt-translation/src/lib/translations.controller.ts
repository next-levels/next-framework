import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import 'reflect-metadata';
import { TranslationsService } from './translations.service';
import { UpdateTranslationDto } from './dtos/translation.dto';
import { TranslationEntity } from './entities/translation.entity';
import { Result } from 'libs/nest/utility/nest-tools/src';

@Controller('translations')
@ApiTags('Translations')
export class TranslationsController {
  constructor(private readonly _translationsService: TranslationsService) {}

  @Post('update')
  public async create(
    @Body() dto: Partial<UpdateTranslationDto>
  ): Promise<Result<Promise<TranslationEntity>>> {
    return await this._translationsService.createOrUpdate(dto);
  }
}
