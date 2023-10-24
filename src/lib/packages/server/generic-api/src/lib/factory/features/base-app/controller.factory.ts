import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Request,
  Type,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { IBaseApiService } from './service.type';
import { BaseApiController } from '../../../types/controller.type';
import { ControllerConfig } from '../../../types/controller-config.type';
 import { SoftDeleteQueryBuilder } from 'typeorm/query-builder/SoftDeleteQueryBuilder';
 import { META } from '@next-levels/types';
import {Result} from "../../../../../../nest-tools";
import {FileInjectInterceptor} from "../../../../../../file-handler";
import {FrontendJwtAuthGuard} from "../../../../../../nest-commons";

export function GenericBaseApiController<T extends Type<any>>(
  entity: T,
  event: any = null
): any {
  @Controller()
  class GenericControllerHost extends BaseApiController {
    constructor(private readonly service: IBaseApiService<T>) {
      super();
    }
    @Get()
    @UseInterceptors(FileInjectInterceptor)
    public async frontendFindAll(
      @Request() req,
      @Query('country') country: string
    ): Promise<Result<T[]>> {
      return await this.service.findAll(req);
    }

    @UseInterceptors(FileInjectInterceptor)
    @Get('filter')
    @ApiQuery({ name: 'page', type: Number, required: false })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({
      name: 'sortBy',
      type: String,
      required: false,
      description: 'Example: sortBy=name:ASC,price:DESC',
    })
    @ApiQuery({
      name: 'searchBy',
      type: String,
      required: false,
      description: 'Example: searchBy=name,price',
    })
    @ApiQuery({ name: 'search', type: String, required: false })
    @ApiQuery({
      name: 'filter',
      type: String,
      required: false,
      description: 'Example: filter.name=$eq:Milo&filter.price=$btw:4,6',
    })
    public async findByFilter(
      @Paginate() query: PaginateQuery,
      @Req() req,
      @Query('country') country: string
    ): Promise<Result<Paginated<T>>> {
      return await this.service.findByFilter(query, country, req);
    }

    @Get(':id')
    @UseInterceptors(FileInjectInterceptor)
    public async findOne(
      @Param('id', ParseIntPipe) id: number,
      @Req() req
    ): Promise<Result<T>> {
      return await this.service.findOne(id, req);
    }

    @Post()
    @ApiBody({ type: entity })
    public async create(@Body() data: T, @Req() req): Promise<Result<T>> {
      const result = await this.service.create(data, req);
      const options = META.getOptionsByModel(new entity());
      let name = '';
      if (options) {
        name = options.name;
      }
      if (event !== null) {
        event.emit('events:' + name, {
          method: 'post',
          data: result.getValue(),
        });
      }
      return result;
    }

    @Delete(':id')
    public async remove(
      @Param('id') id: number,
      @Req() req
    ): Promise<SoftDeleteQueryBuilder<T>> {
      return await this.service.delete(id, req);
    }
  }
  return GenericControllerHost;
}

export function GenericBaseApiControllerCreator<T extends Type<any>>(
  config: ControllerConfig,
  event: any = null
): any {
  @Controller(config.route + '/user/')
  @UseGuards(FrontendJwtAuthGuard)
  class GenericControllerHost extends GenericBaseApiController(
    config.entity,
    event
  ) {
    constructor(
      @Inject(config.serviceToken)
      private readonly service: IBaseApiService<T>
    ) {
      super(service);
    }
  }

  return GenericControllerHost;
}
