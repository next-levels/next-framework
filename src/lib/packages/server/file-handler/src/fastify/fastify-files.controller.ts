import 'reflect-metadata';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Result } from '../../../nest-tools/src';
import { FrontendJwtAuthGuard, JwtAuthGuard } from '../../../nest-commons/src';
import { diskStorage } from 'multer';
import { UpdateFileDto } from '../lib/dtos/update-file.dto';
import { FilesService } from '../lib/files.service';
import {
  decodeBase64ToFile,
  editFileName,
  imageFileFilter,
} from '../lib/file.helper';
import { FileDto } from '../lib/dtos/file.dto';
import { FileEntity } from '../lib/entities/file.entity';
import { FastifyFileInterceptor } from './fastify-file-interceptor';
import { FastifyReply } from 'fastify';
import { FastifyThumbnailService } from './fastify-thumbnail.service';

@Controller('files')
@ApiTags('Files')
export class FastifyFilesController {
  constructor(
    private readonly _filesService: FilesService,
    private readonly _thumbnailService: FastifyThumbnailService
  ) {}

  @Get(':id')
  public async serveLocalFile(
    @Param('id') id: string,
    @Res() reply: FastifyReply
  ): Promise<Result<void>> {
    const file = await this._filesService.findOne(id);
    if (!file) {
      reply.code(404).send('File not found');
      return;
    }
    return await this._thumbnailService.serveFile(file, reply);
  }

  @Get(':id/thumb')
  public async serveThumbnail(
    @Param('id') id: string,
    @Query('width') width: string,
    @Query('height') height: string,
    @Query('type') type: string,
    @Res() reply: FastifyReply
  ): Promise<Result<void>> {
    const file = await this._filesService.findOne(id);
    return await this._thumbnailService.serveThumbnail(
      file,
      reply,
      width,
      height,
      type
    );
  }

  @Get(':id/download')
  async downloadFile(
    @Param('id') id: string,
    @Res() reply: FastifyReply
  ): Promise<Result<void>> {
    const file = await this._filesService.findOne(id);
    if (!file) {
      reply.code(404).send('File not found');
      return undefined;
    }
    return await this._thumbnailService.downloadFile(file, reply);
  }

  @Get('get/:id')
  async getFile(
    @Param('id') id: string,
    @Res() reply: FastifyReply
  ): Promise<Result<FileEntity>> {
    const file = await this._filesService.findOne(id);

    if (!file) {
      reply.code(404).send('File not found');
      return undefined;
    }
    return Result.ok(file);
  }

  @Post('upload/:attachmentType/:attachmentId/:fieldName')
  @UseInterceptors(
    FastifyFileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async uploadFile(
    @UploadedFile() file: File,
    @Param('attachmentType') attachmentType: string,
    @Param('attachmentId') attachmentId: string,
    @Param('fieldName') fieldName: string,
    @Body() dto: Partial<UpdateFileDto>
  ) {
    return await this._filesService.createOrUpdate(
      file,
      attachmentType,
      attachmentId,
      fieldName,
      dto
    );
  }

  @Get('download/:attachmentType/:attachmentId/:fieldName')
  async downloadFiles(
    @Param('attachmentType') attachmentType: string,
    @Param('attachmentId') attachmentId: string,
    @Param('fieldName') fieldName: string
  ) {
    const files = await this._filesService.findFilesByObject(
      attachmentType,
      attachmentId
    );
    return files.filter((file) => file.field_name === fieldName);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FastifyFileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  public async create(
    @Body() dto: Partial<FileDto>,
    @UploadedFile() file
  ): Promise<Result<FileEntity>> {
    return await this._filesService.createFromFile(file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload/file')
  @UseInterceptors(
    FastifyFileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: editFileName,
      }),
    })
  )
  public async createFile(
    @Body() dto: Partial<FileDto>,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Result<FileEntity>> {
    return await this._filesService.createFromFile(file);
  }

  @Post('upload/public')
  @UseInterceptors(
    FastifyFileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/user',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  public async createAsUnknown(
    @Body() dto: Partial<FileDto>,
    @UploadedFile() file
  ): Promise<Result<FileEntity>> {
    return await this._filesService.createFromFile(file);
  }

  @Post('upload/public/base64')
  public async createAsUnknownBase64(
    @Body() dto: Partial<FileDto>,
    @Body('base64') base64: string,
    @Body('mime') mime: string,
    @Body('type') type: string
  ): Promise<Result<FileEntity>> {
    const fieldName = Math.random().toString(36).substring(7);
    const file = await decodeBase64ToFile(base64, fieldName, mime, type);
    return await this._filesService.createFromFile(file);
  }

  @UseGuards(FrontendJwtAuthGuard)
  @Post('upload/frontend/:fieldName')
  @UseInterceptors(
    FastifyFileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/frontenduser',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async uploadFileFrontend(
    @UploadedFile() file,
    @Request() req,
    @Param('fieldName') fieldName: string,
    @Body() dto: Partial<UpdateFileDto>
  ) {
    return await this._filesService.createOrUpdate(
      file,
      'frontenduser',
      req.user.userId,
      fieldName,
      dto
    );
  }

  @UseGuards(FrontendJwtAuthGuard)
  @Post('upload/base64/:fieldName')
  async uploadFileFrontendBase64(
    @Body('base64') base64: string,
    @Request() req,
    @Param('fieldName') fieldName: string,
    @Body() dto: Partial<UpdateFileDto>
  ) {
    const file = await decodeBase64ToFile(base64, fieldName);
    return await this._filesService.createOrUpdate(
      file,
      'frontenduser',
      req.user.userId,
      fieldName,
      dto
    );
  }

  @UseGuards(FrontendJwtAuthGuard)
  @Post('upload/frontend')
  @UseInterceptors(
    FastifyFileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/user',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  public async createAsUser(
    @Body() dto: Partial<FileDto>,
    @UploadedFile() file
  ): Promise<Result<FileEntity>> {
    return await this._filesService.createFromFile(file);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  public async update(@Body() dto: FileDto): Promise<Result<FileEntity>> {
    return this._filesService.update(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  public async delete(@Query('id') id: string): Promise<Result<unknown>> {
    const file = await this._filesService.findOne(id);
    return this._filesService.remove(file);
  }
}
