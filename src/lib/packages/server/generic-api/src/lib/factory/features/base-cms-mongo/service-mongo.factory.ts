import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {IBaseCmsServiceMongo} from './service.type';
import {BaseApiService} from '../../../types/service.type';
import {Result} from '../../../../../../nest-tools';

export function GenericBaseCMSServiceMongo<T extends Document>(entity: any): any {
    @Injectable()
    class GenericServiceHost extends BaseApiService implements IBaseCmsServiceMongo<T> {
        constructor(
            @InjectModel(entity.name)
            private readonly model: Model<T>
        ) {
            super();
        }

        async create(data: T): Promise<any> {
            const createdEntity = new this.model(data);
            const savedEntity = createdEntity.save()
                .then(doc => {
                    return {id: doc._id,...doc}
                })
                .catch(err => {
                    return err;
                });

        }

        async update(_id: string, data: Partial<T>): Promise<Result<any>> {
            const updatedEntity = await this.model.findOneAndUpdate({_id: _id}, data, {new: true}).lean().exec();
            if (!updatedEntity) {
                throw new Error('Entity not found');
            }
            return Result.ok(updatedEntity);
        }

        async delete(_id: string): Promise<Result<any>> {
             await this.model.findOneAndDelete({_id: _id}).exec();
            return Result.ok({_id});
        }

        async findAll(): Promise<Result<any>> {
            const entities = await this.model.find().lean().exec();
            return Result.ok(entities);
        }

        async findByFilter(query: any): Promise<Result<any>> {
            const documents = await this.model.find(this.transformQueryFilter(query.filter)).exec();

             const data = documents.map(doc => {
                 return {
                    id: doc._id.toString(),
                    ...doc.toObject({ virtuals: true, versionKey: false }),
                };
            });
            console.log(data)

            const response = {
                data: data,
                links: {
                    current: ''
                 },
                meta: {
                    itemsPerPage: query.limit,
                    totalItems: data.length, // or the total count from the database if available
                    currentPage: query.page,
                    totalPages: Math.ceil(data.length / query.limit),
                    sortBy: [["id", "DESC"]]
                }
            };

            return Result.ok(response);
        }

      private transformQueryFilter(queryFilter) {
        const transformedFilter = {...queryFilter};
        Object.keys(transformedFilter).forEach(key => {
          if (typeof transformedFilter[key] === 'string' && transformedFilter[key].startsWith('$eq:')) {
            transformedFilter[key] = transformedFilter[key].substring(4); // Remove the first 4 characters ('$eq:')
          }
        });

        return transformedFilter;
      }
        async findOne(key: string): Promise<Result<any | null>> {
            const entity = await this.model.findOne({key: key}).lean().exec();

            console.log(entity)
             return Result.ok({
                id: entity._id.toString(),
                ...entity
            });
        }

        async saveWithRelations(entity: T): Promise<T> {
            const createdEntity = new this.model(entity);
            await createdEntity.save();
            return createdEntity;
        }
    }

    return GenericServiceHost;
}
