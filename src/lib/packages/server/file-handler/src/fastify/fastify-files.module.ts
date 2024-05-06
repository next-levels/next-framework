import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '../lib/entities/file.entity';
import { FilesService } from '../lib/files.service';
import { FastifyFilesController } from './fastify-files.controller';
import { FastifyThumbnailService } from './fastify-thumbnail.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), HttpModule],
  providers: [FilesService, FastifyThumbnailService],
  exports: [FilesService, FastifyThumbnailService],
  controllers: [FastifyFilesController],
})
export class FastifyFilesModule {}
