import { NgModule } from '@angular/core';
import { NgbdSortableHeader } from './directive/sortable.directive';

export { PaginatorService } from './service/paginator.service';
export { NgbdSortableHeader, rotate } from './directive/sortable.directive';

@NgModule({
  declarations: [NgbdSortableHeader],
  exports: [NgbdSortableHeader],
})
export class PaginationModule {}
