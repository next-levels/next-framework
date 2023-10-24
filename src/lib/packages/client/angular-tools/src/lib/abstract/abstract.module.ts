import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginationStd } from './mat-pagination.std';

export { DeletedFlag } from './deleted.flag';
export { PaginationPart } from './pagination.part';
export { MatPaginationStd } from './mat-pagination.std';
@NgModule({
  imports: [CommonModule],
  declarations: [MatPaginationStd],
})
export class AbstractModule {}
