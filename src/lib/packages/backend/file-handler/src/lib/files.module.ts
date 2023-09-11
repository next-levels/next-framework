import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ThumbnailService } from './thumbnail.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), HttpModule],
  providers: [FilesService, ThumbnailService],
  exports: [FilesService, ThumbnailService],
  controllers: [FilesController],
})
export class FilesModule {}
