import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationEntity } from './entities/translation.entity';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';

@Module({
  imports: [TypeOrmModule.forFeature([TranslationEntity]), HttpModule],
  providers: [TranslationsService],
  exports: [TranslationsService],
  controllers: [TranslationsController],
})
export class TranslationsModule {}
