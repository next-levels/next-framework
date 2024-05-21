import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationEntity } from './entities/translation.entity';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';
import { LanguagesEntity } from './entities/languages.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TranslationEntity, LanguagesEntity]),
    HttpModule,
  ],
  providers: [TranslationsService],
  exports: [
    TranslationsService,
    TypeOrmModule.forFeature([TranslationEntity, LanguagesEntity]),
  ],
  controllers: [TranslationsController],
})
export class TranslationsModule {}
