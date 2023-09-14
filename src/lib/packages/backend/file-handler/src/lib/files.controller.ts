import 'reflect-metadata';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  decodeBase64ToFile,
  editFileName,
  imageFileFilter,
} from './file.helper';
import { FileDto } from './dtos/file.dto';
import { UpdateFileDto } from './dtos/update-file.dto';
import { FileEntity } from './entities/file.entity';
import 'reflect-metadata';
import { ThumbnailService } from './thumbnail.service';
import { Response as ExpressResponse } from 'express';
import { Result } from '../../../nest-tools/src';
import { FrontendJwtAuthGuard, JwtAuthGuard } from '../../../nest-commons/src';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(
    private readonly _filesService: FilesService,
    private readonly _thumbnailService: ThumbnailService
  ) {}

  @Get(':id')
  public async serveLocalFile(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ): Promise<Result<void>> {
    if (!id) return Result.ok();
    return await this._filesService.serveFile(id, res);
  }

  @Get(':id/thumb')
  public async serveThumbnail(
    @Param('id', ParseIntPipe) id: number,
    @Query('width') width: string,
    @Query('height') height: string,
    @Query('type') type: string,
    @Res() res: ExpressResponse
  ): Promise<Result<void>> {
    const file = await this._filesService.findOne(id);
    return await this._thumbnailService.serveThumbnail(
      file,
      res,
      width,
      height,
      type
    );
  }

  @Get(':id/download')
  async downloadFile(
    @Param('id') id: number,
    @Res() res: ExpressResponse
  ): Promise<Result<void>> {
    const file = await this._filesService.findOne(id);
    if (!file) {
      res.status(404).send('File not found');
      return;
    }
    return await this._thumbnailService.downloadFile(file, res);
  }

  @Post('upload/:attachmentType/:attachmentId/:fieldName')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/tires',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async uploadFile(
    @UploadedFile() file,
    @Param('attachmentType') attachmentType: string,
    @Param('attachmentId') attachmentId: number,
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

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
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

  @Post('upload/public')
  @UseInterceptors(
    FileInterceptor('file', {
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
    FileInterceptor('file', {
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
    FileInterceptor('image', {
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
  public async delete(
    @Query('id', ParseIntPipe) id: number
  ): Promise<Result<unknown>> {
    const file = await this._filesService.findOne(id);
    return this._filesService.remove(file);
  }
}
