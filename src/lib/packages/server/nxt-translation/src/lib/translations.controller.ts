import 'reflect-metadata';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TranslationsService } from './translations.service';
import { TranslationEntity } from './entities/translation.entity';
import { Result } from '../../../nest-tools/src/lib/return/result';

@Controller('translations')
@ApiTags('Translations')
export class TranslationsController {
  constructor(private readonly _translationsService: TranslationsService) {}

  @Get('langs')
  public async getLangs(): Promise<Result<any[]>> {
    return Result.ok(await this._translationsService.getLangs());
  }

  @Get('field/:model/:id/:field')
  public async getField(
    @Param('model') model: string,
    @Param('id') id: string,
    @Param('field') field: string
  ): Promise<Result<any[]>> {
    return Result.ok(
      await this._translationsService.findField(model, id, field)
    );
  }

  @Post('update')
  public async create(@Body() body: any): Promise<Result<TranslationEntity[]>> {
    let result = await this._translationsService.createOrUpdate(
      body.dto,
      body.model_field
    );
    return result;
  }
}
