import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import 'reflect-metadata';
import { Observable, switchMap } from 'rxjs';
import { FILE_FIELD_METADATA_KEY } from '../decoretors/file-field.decorator';
import { FilesService } from '../files.service';
import { fileMapping } from '../constants/file-mapping';
import { convertItem } from '../file.helper';
import { Result } from '../../../../nest-tools/src';

@Injectable()
export class FileInjectInterceptor implements NestInterceptor {
  constructor(private readonly filesService: FilesService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.method === 'DELETE') {
      return next.handle();
    }

    return next.handle().pipe(
      switchMap(async (data) => {
        if (!data) {
          return data;
        }
        let requestEntity = null;
        let singleEnitiy = false;
        let paginated = null;
        const entitiesWithFileFields = this.filesService.entitiesWithFileFields;
        if (data instanceof Result) {
          data = data.getValue();
        }

        if (data instanceof Paginated) {
          paginated = data;
          data = data.data;
        }

        for (const key in fileMapping) {
          if (request.url.includes(key)) {
            requestEntity = fileMapping[key];
            for (const [key, item] of data.entries()) {
              data[key] = convertItem(item, requestEntity);
            }
            break;
          }
        }

        if (!Array.isArray(data)) {
          data = [data];
          singleEnitiy = true;
        }

        if (request.url.indexOf('filter') === -1) {
          console.log('filteres', entitiesWithFileFields.entries());
        }
        for (const item of data) {
          for (const [className, Entity] of entitiesWithFileFields.entries()) {
            // if (item instanceof Entity) {
            await this.processFileFields(item, className, Entity);
            // }
          }
        }

        if (singleEnitiy && data.length > 0) {
          data = data[0];
        }
        if (paginated) {
          paginated.data = data;
          return Result.ok(paginated);
        }

        return Result.ok(data);
      })
    );
  }

  private async processFileFields(entity, className: string, EntityModel) {
    const fileFields = Reflect.getMetadata(
      FILE_FIELD_METADATA_KEY,
      EntityModel?.prototype
    );
    console.log(
      'className',
      className,
      entity.id,
      fileFields,
      EntityModel?.constructor,
      EntityModel?.prototype
    );
    if (fileFields && Array.isArray(fileFields)) {
      for (const fileField of fileFields) {
        const files = await this.filesService.findFilesByObject(
          className,
          entity.id
        );
        const matchingFiles = files.filter(
          (file) => file.field_name === fileField.fieldName
        );

        if (fileField && fileField.multi) {
          entity[fileField.fieldName] = matchingFiles;
        } else {
          entity[fileField.fieldName] = matchingFiles[0] || null;
        }

        console.log('fileField.fieldName', entity.id, matchingFiles.length);
      }
    }
  }
}
