import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Type,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {ApiBody, ApiQuery} from '@nestjs/swagger';
import {Paginate, Paginated, PaginateQuery} from 'nestjs-paginate';
import {IBaseCmsServiceMongo} from './service.type';
import {BaseApiController} from '../../../types/controller.type';
import {ControllerConfig} from '../../../types/controller-config.type';
import {FileInjectInterceptor} from "../../../../../../file-handler";
import {Result} from "../../../../../../nest-tools";
import {JwtAuthGuard} from "../../../../../../nest-commons";
import {META} from "@next-levels/types";

export function GenericBaseCMSControllerMongo<T extends Type<any>>(
    entity: T,
    event: any = null
): any {
    @Controller()
    class GenericControllerHost extends BaseApiController {
        constructor(private readonly service: IBaseCmsServiceMongo<T>) {
            super();
        }

        @Get('frontend')
        @UseInterceptors(FileInjectInterceptor)
        public async frontendFindAll(
            @Query('country') country: string
        ): Promise<Result<T[]>> {
            return await this.service.findAll();
        }

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
            @Req() req
        ): Promise<Result<Paginated<T>>> {
            return await this.service.findByFilter(query);
        }

        @Post()
        @ApiBody({type: entity})
        public async create(@Body() dto: T): Promise<Result<T>> {
            const result =  Result.ok(await this.service.create(dto));

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

        @Patch(':id')
        @ApiBody({type: entity})
        public async update(@Param('id') id: string, @Body() dto: T): Promise<Result<T>> {
            const result = await this.service.update(id, dto);

            const options = META.getOptionsByModel(new entity());
            let name = '';
            if (options) {
                name = options.name;
            }
            if (event !== null) {
                event.emit('events:' + name, {
                    method: 'patch',
                    data: result.getValue(),
                });
            }
            return result;
        }

        @Delete(':id')
        public async remove(@Param('id') id: string): Promise<Result<void>> {
            return await this.service.delete(id);
        }

        @Get(':id')
        @UseInterceptors(FileInjectInterceptor)
        public async frontendFindOne(@Param('id') id: string): Promise<Result<T>> {
            return await this.service.findOne(id);
        }
    }

    return GenericControllerHost;
}

export function GenericBaseCMSControllerCreatorMongo<T extends Type<any>>(
    config: ControllerConfig,
    event: any = null
): any {
    @Controller(config.route + '/admin/')
    @UseGuards(JwtAuthGuard)
    class GenericControllerHost extends GenericBaseCMSControllerMongo(
        config.entity,
        event
    ) {
        constructor(
            @Inject(config.serviceToken)
            private readonly service: IBaseCmsServiceMongo<T>
        ) {
            super(service);
        }
    }

    return GenericControllerHost;
}
